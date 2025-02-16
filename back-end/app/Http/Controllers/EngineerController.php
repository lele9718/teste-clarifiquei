<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class EngineerController extends Controller
{
    // Criar um novo engenheiro
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'max_workload' => 'required|integer',
            'efficiency' => 'required|numeric'
        ]);

        DB::insert('INSERT INTO engineers (name, max_workload, efficiency) VALUES (?, ?, ?)', [
            $data['name'],
            $data['max_workload'],
            $data['efficiency']
        ]);

        return response()->json(['message' => 'Engenheiro criado com sucesso'], 201);
    }

    // Listar todos os engenheiros
    public function index()
    {
        $engineers = DB::select('SELECT * FROM engineers');
        return response()->json($engineers);
    }

    // Atualizar os dados um engenheiro
    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'name' => 'string',
            'max_workload' => 'integer',
            'efficiency' => 'numeric'
        ]);

        DB::update('UPDATE engineers SET name = ?, max_workload = ?, efficiency = ? WHERE id = ?', [
            $data['name'] ?? null,
            $data['max_workload'] ?? null,
            $data['efficiency'] ?? null,
            $id
        ]);

        return response()->json(['message' => 'Engenheiro atualizado com sucesso']);
    }

    // Excluir os dados de um engenheiro
    public function destroy($id)
    {
        DB::delete('DELETE FROM engineers WHERE id = ?', [$id]);
        return response()->json(['message' => 'Engenheiro excluído com sucesso']);
    }
}