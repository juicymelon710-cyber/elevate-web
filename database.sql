CREATE TABLE IF NOT EXISTS project_requests (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(190) NOT NULL,
  phone VARCHAR(50) NULL,
  service VARCHAR(120) NOT NULL,
  budget VARCHAR(120) NOT NULL,
  message TEXT NOT NULL,
  source VARCHAR(80) NOT NULL DEFAULT 'website_contact_form',
  status ENUM('new', 'contacted', 'closed') NOT NULL DEFAULT 'new',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_project_requests_email (email),
  INDEX idx_project_requests_status (status),
  INDEX idx_project_requests_created_at (created_at)
);
