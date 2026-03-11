-- ─────────────────────────────────────────────
-- Fineract Mock Server - Seed Data
-- Run with:
-- mysql -u root -P 3307 -h 127.0.0.1 fineract_mock < seed.sql
-- ─────────────────────────────────────────────

USE fineract_mock;

-- Users (password is 'password' bcrypt hashed)
INSERT INTO users (username, password, firstname, lastname, email, officeId, staffId, roles, permissions, isSelfServiceUser, createdAt, updatedAt)
VALUES (
  'mifos',
  '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.',
  'App', 'Administrator', 'admin@mifos.org',
  1, NULL,
  '[{"id":1,"name":"Super user","description":"This role provides all application permissions."}]',
  '["ALL_FUNCTIONS"]',
  0, NOW(), NOW()
) ON DUPLICATE KEY UPDATE username=username;

-- Offices
INSERT INTO offices (id, name, nameDecorated, openingDate, hierarchy, parentId, createdAt)
VALUES
  (1, 'Head Office',   'Head Office',       '[2009,1,1]',  '.',   NULL, NOW()),
  (2, 'Lagos Branch',  '. Lagos Branch',    '[2020,3,15]', '.2.', 1,    NOW()),
  (3, 'Abuja Branch',  '. Abuja Branch',    '[2021,6,1]',  '.3.', 1,    NOW())
ON DUPLICATE KEY UPDATE name=name;

-- Clients
INSERT INTO clients (id, accountNo, status, active, activationDate, firstname, lastname, displayName, officeId, officeName, timeline, imagePresent, createdAt, updatedAt)
VALUES
  (1,'000000001','{"id":300,"code":"clientStatusType.active","value":"Active","active":true}',1,'[2022,1,15]','Amara','Okafor','Amara Okafor',1,'Head Office','{"submittedOnDate":[2022,1,10],"activatedOnDate":[2022,1,15]}',0,NOW(),NOW()),
  (2,'000000002','{"id":300,"code":"clientStatusType.active","value":"Active","active":true}',1,'[2022,1,15]','Chidi','Nwosu','Chidi Nwosu',2,'Lagos Branch','{"submittedOnDate":[2022,1,10],"activatedOnDate":[2022,1,15]}',0,NOW(),NOW()),
  (3,'000000003','{"id":300,"code":"clientStatusType.active","value":"Active","active":true}',1,'[2022,1,15]','Fatima','Bello','Fatima Bello',2,'Lagos Branch','{"submittedOnDate":[2022,1,10],"activatedOnDate":[2022,1,15]}',0,NOW(),NOW()),
  (4,'000000004','{"id":300,"code":"clientStatusType.active","value":"Active","active":true}',1,'[2022,1,15]','Emeka','Eze','Emeka Eze',3,'Abuja Branch','{"submittedOnDate":[2022,1,10],"activatedOnDate":[2022,1,15]}',0,NOW(),NOW()),
  (5,'000000005','{"id":300,"code":"clientStatusType.active","value":"Active","active":true}',1,'[2022,1,15]','Ngozi','Adeyemi','Ngozi Adeyemi',1,'Head Office','{"submittedOnDate":[2022,1,10],"activatedOnDate":[2022,1,15]}',0,NOW(),NOW())
ON DUPLICATE KEY UPDATE id=id;

-- Loan Products
INSERT INTO loan_products (id, name, shortName, description, currency, principal, createdAt)
VALUES
  (1,'Personal Loan','PL01','Standard personal loan product','{"code":"NGN","name":"Nigerian Naira","decimalPlaces":2,"displaySymbol":"₦"}',100000,NOW()),
  (2,'Business Loan','BL01','SME business loan','{"code":"NGN","name":"Nigerian Naira","decimalPlaces":2,"displaySymbol":"₦"}',500000,NOW())
ON DUPLICATE KEY UPDATE id=id;

-- Loans
INSERT INTO loans (id, accountNo, status, clientId, clientName, clientAccountNo, loanProductId, loanProductName, loanType, currency, principal, termFrequency, timeline, summary, createdAt, updatedAt)
VALUES
  (1,'LN000000001','{"id":300,"code":"loanStatusType.active","value":"Active","active":true}',1,'Amara Okafor','000000001',1,'Personal Loan','{"id":1,"code":"loanType.individual","value":"Individual"}','{"code":"NGN","displaySymbol":"₦"}',150000,12,'{"actualDisbursementDate":[2023,3,10]}','{"principalDisbursed":150000,"principalOutstanding":100000,"totalOutstanding":118000}',NOW(),NOW()),
  (2,'LN000000002','{"id":200,"code":"loanStatusType.approved","value":"Approved","active":false}',2,'Chidi Nwosu','000000002',2,'Business Loan','{"id":1,"code":"loanType.individual","value":"Individual"}','{"code":"NGN","displaySymbol":"₦"}',500000,24,'{"approvedOnDate":[2024,1,15]}','{"principalDisbursed":0,"principalOutstanding":500000,"totalOutstanding":590000}',NOW(),NOW()),
  (3,'LN000000003','{"id":300,"code":"loanStatusType.active","value":"Active","active":true}',3,'Fatima Bello','000000003',1,'Personal Loan','{"id":1,"code":"loanType.individual","value":"Individual"}','{"code":"NGN","displaySymbol":"₦"}',80000,6,'{"actualDisbursementDate":[2023,11,10]}','{"principalDisbursed":80000,"principalOutstanding":40000,"totalOutstanding":43600}',NOW(),NOW())
ON DUPLICATE KEY UPDATE id=id;

-- Savings Accounts
INSERT INTO savings_accounts (id, accountNo, status, clientId, clientName, savingsProductId, savingsProductName, currency, accountBalance, timeline, createdAt, updatedAt)
VALUES
  (1,'SV000000001','{"id":300,"code":"savingsAccountStatusType.active","value":"Active","active":true}',1,'Amara Okafor',1,'Regular Savings','{"code":"NGN","displaySymbol":"₦"}',45000,'{"activatedOnDate":[2022,1,15]}',NOW(),NOW()),
  (2,'SV000000002','{"id":300,"code":"savingsAccountStatusType.active","value":"Active","active":true}',2,'Chidi Nwosu',1,'Regular Savings','{"code":"NGN","displaySymbol":"₦"}',120000,'{"activatedOnDate":[2022,3,20]}',NOW(),NOW()),
  (3,'SV000000003','{"id":300,"code":"savingsAccountStatusType.active","value":"Active","active":true}',5,'Ngozi Adeyemi',1,'Regular Savings','{"code":"NGN","displaySymbol":"₦"}',75500,'{"activatedOnDate":[2023,5,10]}',NOW(),NOW())
ON DUPLICATE KEY UPDATE id=id;

-- Verify
SELECT 'users' as tbl, COUNT(*) as count FROM users
UNION ALL SELECT 'offices', COUNT(*) FROM offices
UNION ALL SELECT 'clients', COUNT(*) FROM clients
UNION ALL SELECT 'loans', COUNT(*) FROM loans
UNION ALL SELECT 'savings_accounts', COUNT(*) FROM savings_accounts;