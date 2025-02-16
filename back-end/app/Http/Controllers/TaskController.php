<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    // Criar uma nova tarefa
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'priority' => 'required|in:Alta,Média,Baixa',
            'time_required' => 'required|integer'
        ]);

        DB::insert('INSERT INTO tasks (name, priority, time_required) VALUES (?, ?, ?)', [
            $data['name'],
            $data['priority'],
            $data['time_required']
        ]);

        return response()->json(['message' => 'Tarefa criada com sucesso'], 201);
    }

    // Listar todas as tarefas
    public function index()
    {
        $tasks = DB::select('SELECT * FROM tasks');
        return response()->json($tasks);
    }

    // Atualizar uma tarefa
    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'name' => 'string',
            'priority' => 'in:Alta,Média,Baixa',
            'time_required' => 'integer'
        ]);

        DB::update('UPDATE tasks SET name = ?, priority = ?, time_required = ? WHERE id = ?', [
            $data['name'] ?? null,
            $data['priority'] ?? null,
            $data['time_required'] ?? null,
            $id
        ]);

        return response()->json(['message' => 'Tarefa atualizada com sucesso']);
    }

    // Excluir uma tarefa
    public function destroy($id)
    {
        // Deleta as alocações relacionadas à tarefa
        DB::delete('DELETE FROM assignments WHERE task_id = ?', [$id]);
    
        // Deleta a tarefa
        DB::delete('DELETE FROM tasks WHERE id = ?', [$id]);
    
        return response()->json(['message' => 'Tarefa e suas alocações excluídas com sucesso']);
    }
}