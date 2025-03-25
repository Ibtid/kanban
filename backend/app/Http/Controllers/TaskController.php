<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class TaskController extends Controller
{
    
    public function index()
    {
        Log::info('Task store request received');
        $tasks = Task::where('user_id', Auth::id())->get();
        return response()->json($tasks, 200);
    }

    // Filter tasks by status
    public function filterTasks(Request $request)
    {
        Log::info('This is a test log message');
        $status = $request->query('status');
    
        if (!$status || strtolower($status) === 'all') {
            return response()->json(Task::where('user_id', auth()->id())->get());
        }
    
        $statusArray = explode(',', $status);
    
        // Debugging
        \Log::info('Filtering tasks with status: ', $statusArray);
    
        $tasks = Task::where('user_id', auth()->id())
            ->whereIn('status', $statusArray)
            ->get();
    
        // Log found tasks
        \Log::info('Found tasks: ', $tasks->toArray());
    
        return response()->json($tasks);
    }

    // Sort tasks by created_at or due_date
    public function sortTasks(Request $request)
    {
        Log::info('This is a test log message');
        $query = Task::where('user_id', Auth::id());
    
        $sortBy = in_array($request->sort_by, ['created_at', 'due_date']) ? $request->sort_by : 'created_at';
        $sortOrder = $request->has('sort_order') && $request->sort_order === 'desc' ? 'desc' : 'asc';
    
        // Log sorting request
        \Log::info("Sorting by: $sortBy in $sortOrder order");
    
        $tasks = $query->orderBy($sortBy, $sortOrder)->get();
    
        // Log sorted tasks
        \Log::info('Sorted tasks:', $tasks->toArray());
    
        return response()->json($tasks, 200);
    }

    public function store(Request $request)
    {
        Log::info('This is a test log message');
        Log::info('Task store request received', $request->all());

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'due_date' => 'nullable|date',
        ]);

        $task = Task::create([
            'user_id' => auth()->id(),
            'name' => $validated['name'],
            'description' => $validated['description'] ?? null,
            'due_date' => $validated['due_date'] ?? null,
            'status' => 'To Do', // Default status
        ]);

        return response()->json($task, 201);
    }

    public function show($id)
    {
        Log::info('This is a test log message');
        $task = Task::where('id', $id)->where('user_id', Auth::id())->first();

        Log::info('This is a log message from the controller.');
        Log::error('This is an error message from the controller.');
        if (!$task) {
            return response()->json(['message' => 'Task not found'], 404);
        }

        return response()->json($task, 200);
    }

    public function update(Request $request, $id)
    {
        Log::info('This is a test log message');
        $task = Task::where('id', $id)->where('user_id', Auth::id())->first();

        if (!$task) {
            return response()->json(['message' => 'Task not found'], 404);
        }

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'status' => 'sometimes|in:To Do,In Progress,Done',
            'due_date' => 'nullable|date',
        ]);

        $task->update($validated);

        return response()->json($task, 200);
    }

    public function destroy($id)
    {
        Log::info('This is a test log message');
        $task = Task::where('id', $id)->where('user_id', Auth::id())->first();

        if (!$task) {
            return response()->json(['message' => 'Task not found'], 404);
        }

        $task->delete();

        return response()->json(['message' => 'Task deleted'], 200);
    }

    public function searchTasks(Request $request)
    {
       
        $searchQuery = $request->query('query');
        
       
        if (!$searchQuery) {
            return response()->json(['message' => 'Query parameter is required'], 400);
        }
    
        $tasks = Task::where('user_id', auth()->id()) 
            ->where('name', 'LIKE', '%' . $searchQuery . '%') 
            ->get();
    
        return response()->json($tasks);
    }    
}
