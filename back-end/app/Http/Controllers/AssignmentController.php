<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class AssignmentController extends Controller
{
    // Alocar tarefas automaticamente
    public function allocateTasks()
{
    // Primeiro, buscamos as tarefas que ainda não foram alocadas (status 'Pendente')
    $tasks = DB::table('tasks')
        ->whereNotIn('tasks.id', function ($query) {
            $query->select('task_id')->from('assignments');
        })
        ->orderByRaw('
        CASE 
            WHEN priority = "Alta" THEN 1
            WHEN priority = "Média" THEN 2
            WHEN priority = "Baixa" THEN 3
            ELSE 4
        END')
        ->get();

    //se nao houverem tarefas retornar um bad request
    if ($tasks->isEmpty()) {
        return response()->json(['message' => 'Não há tarefas pendentes para alocar.'], 400);  // Retorna um Bad Request (400)
    }

    // Para cada tarefa, vamos tentar alocar para os engenheiros
    foreach ($tasks as $task) {
        $timeRequired = $task->time_required; // Tempo necessário para a tarefa
        $allocated = false;

        // Buscamos os engenheiros ordenados pela carga máxima de trabalho restante
        $engineers = DB::table('engineers')->get();

        foreach ($engineers as $engineer) {
            $availableWorkload = $engineer->max_workload; // A carga máxima de horas de cada engenheiro

            // Verificamos se o engenheiro já está alocado em outra tarefa
            $conflictingTask = DB::table('assignments')
                ->where('engineer_id', $engineer->id)
                ->whereIn('status', ['Pendente', 'Em andamento'])
                ->exists();

            $taskAlreadyExists = DB::table('assignments')
                ->where('task_id', $task->id)
                ->exists();
                //

            // Se o engenheiro já está alocado em outra tarefa, vamos pular para o próximo engenheiro
            if ($conflictingTask || $taskAlreadyExists) {
                continue;
            }

            // Verificamos se o engenheiro tem horas suficientes para assumir a tarefa
            if ($availableWorkload >= $timeRequired) {
                // Alocamos a tarefa para este engenheiro
                DB::table('assignments')->insert([
                    'engineer_id' => $engineer->id,
                    'task_id' => $task->id,
                    'status' => 'Pendente',
                    'start_date' => now(),
                    'end_date' => now()->addHours($timeRequired),
                    'adjusted_time' => $timeRequired,
                ]);

                // Atualizamos a carga máxima de trabalho do engenheiro
                $newWorkload = $availableWorkload - $timeRequired;
                DB::table('engineers')
                    ->where('id', $engineer->id)
                    ->update(['max_workload' => $newWorkload]);

                // Marcar a tarefa como alocada e sair do loop
                $allocated = true;
            }
        }

        // Se a tarefa não foi alocada, podemos lançar um erro ou mensagem
        if (!$allocated) {
            // Aqui podemos lançar uma exceção ou tratar conforme necessário
            return response()->json(['message' => "Não existem engenheiros com tempo para esta tarefa: {$task->name}"], 400);
        }

        return response()->json(['message' => "Tarefas alocadas"]);
    }
}

    // Marcar tarefa como "Em andamento"
    public function startTask($id)
    {
        DB::update('UPDATE assignments SET status = ?, start_date = NOW() WHERE id = ?', ['Em andamento', $id]);
        return response()->json(['message' => 'Tarefa iniciada']);
    }

    // Marcar tarefa como "Concluída"
    public function completeTask($id)
    {
        DB::update('UPDATE assignments SET status = ?, end_date = NOW() WHERE id = ?', ['Concluída', $id]);
        return response()->json(['message' => 'Tarefa concluída']);
    }

    // Relatório de alocação
    public function report()
    {
        $assignments = DB::select(
            'SELECT a.*, e.name AS engineer_name, t.name AS task_name 
             FROM assignments a 
             JOIN engineers e ON a.engineer_id = e.id 
             JOIN tasks t ON a.task_id = t.id
             order by a.id'
        );
        return response()->json($assignments);
    }
}