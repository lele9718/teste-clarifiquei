CREATE DATABASE IF NOT EXISTS task_management;
USE task_management;

-- Tabela de Engenheiros
CREATE TABLE engineers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    max_workload INT NOT NULL, -- Carga máxima em horas
    efficiency DECIMAL(4, 2) NOT NULL -- Eficiência (ex: 1.20 = 20% mais rápido)
);

-- Tabela de Tarefas
CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    priority ENUM('Alta', 'Média', 'Baixa') NOT NULL,
    time_required INT NOT NULL -- Tempo estimado em horas
);

-- Tabela de Alocações
CREATE TABLE assignments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    engineer_id INT NOT NULL,
    task_id INT NOT NULL,
    status ENUM('Pendente', 'Em andamento', 'Concluída') DEFAULT 'Pendente',
    start_date DATE,
    end_date DATE,
    adjusted_time INT, -- Tempo ajustado com base na eficiência
    FOREIGN KEY (engineer_id) REFERENCES engineers(id),
    FOREIGN KEY (task_id) REFERENCES tasks(id)
);