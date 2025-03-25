<?php

namespace Tests\Feature;

use App\Models\Task;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TaskControllerTest extends TestCase
{
    use RefreshDatabase;

    protected $user;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
    }

    public function test_can_get_all_tasks()
    {
        Task::factory()->count(3)->create(['user_id' => $this->user->id]);
        
        $response = $this->actingAs($this->user)->getJson('/api/tasks');
        
        $response->assertStatus(200)->assertJsonCount(3);
    }

    public function test_can_filter_tasks_by_status()
    {
        Task::factory()->create(['user_id' => $this->user->id, 'status' => 'To Do']);
        Task::factory()->create(['user_id' => $this->user->id, 'status' => 'Done']);
        
        $response = $this->actingAs($this->user)->getJson('/api/tasks/filter?status=To Do');
        
        $response->assertStatus(200)->assertJsonFragment(['status' => 'To Do']);
    }

    public function test_can_store_task()
    {
        $data = ['name' => 'New Task', 'description' => 'Test Desc', 'due_date' => '2025-03-25'];
        
        $response = $this->actingAs($this->user)->postJson('/api/tasks', $data);
        
        $response->assertStatus(201)->assertJsonFragment(['name' => 'New Task']);
    }

    public function test_can_update_task()
    {
        $task = Task::factory()->create(['user_id' => $this->user->id]);
        
        $response = $this->actingAs($this->user)->putJson("/api/tasks/{$task->id}", ['name' => 'Updated Task']);
        
        $response->assertStatus(200)->assertJsonFragment(['name' => 'Updated Task']);
    }

    public function test_can_delete_task()
    {
        $task = Task::factory()->create(['user_id' => $this->user->id]);
        
        $response = $this->actingAs($this->user)->deleteJson("/api/tasks/{$task->id}");
        
        $response->assertStatus(200)->assertJson(['message' => 'Task deleted']);
    }

    public function test_can_search_tasks()
    {
        Task::factory()->create(['user_id' => $this->user->id, 'name' => 'Special Task']);
        
        $response = $this->actingAs($this->user)->getJson('/api/tasks/search?query=Special');
        
        $response->assertStatus(200)->assertJsonFragment(['name' => 'Special Task']);
    }
}
