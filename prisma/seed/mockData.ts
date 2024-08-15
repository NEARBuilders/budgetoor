import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const splitSql = (sql: string) => {
  return sql.split(';').filter(content => content.trim() !== '')
}

async function main() {
  const sql = `

INSERT INTO "User" ("id", "email", "name", "pictureUrl", "stripeCustomerId", "password") VALUES ('15951296-2a59-499b-b09c-8f6f3d32391a', '1Saige_Rau-Williamson88@hotmail.com', 'Jane Smith', 'https://i.imgur.com/YfJQV5z.png?id=3', 'cus_J4n3Sm1th456', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "stripeCustomerId", "password") VALUES ('60b2623a-c10f-4af3-b120-7ce60d135827', '7Simeon_Bogan@hotmail.com', 'Emily Clark', 'https://i.imgur.com/YfJQV5z.png?id=9', 'cus_Em1lyC012', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "stripeCustomerId", "password") VALUES ('76998da2-3835-48ec-b782-45c7f288f7e8', '19Odie6@hotmail.com', 'John Doe', 'https://i.imgur.com/YfJQV5z.png?id=21', 'cus_D4v1dL345', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "stripeCustomerId", "password") VALUES ('3f750e3e-90aa-432c-9e97-4a7e182910d9', '25Alexis82@hotmail.com', 'Michael Jordan', 'https://i.imgur.com/YfJQV5z.png?id=27', 'cus_D4v1dL345', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "stripeCustomerId", "password") VALUES ('369908d1-079f-4034-aaf1-5f2e33d8fe8c', '31Virginie43@yahoo.com', 'John Doe', 'https://i.imgur.com/YfJQV5z.png?id=33', 'cus_M1ch43l789', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "stripeCustomerId", "password") VALUES ('0319051a-bde3-4a49-a4c1-34009a11802d', '37Camille_Carroll36@gmail.com', 'Michael Jordan', 'https://i.imgur.com/YfJQV5z.png?id=39', 'cus_J4n3Sm1th456', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "stripeCustomerId", "password") VALUES ('ca15a656-8864-4be0-aa13-6cc415ddb724', '43Beryl.Schmidt@yahoo.com', 'Michael Jordan', 'https://i.imgur.com/YfJQV5z.png?id=45', 'cus_D4v1dL345', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "stripeCustomerId", "password") VALUES ('7da60d5d-4dbd-41dc-9236-365492d07f63', '49Jason.White@yahoo.com', 'John Doe', 'https://i.imgur.com/YfJQV5z.png?id=51', 'cus_M1ch43l789', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "stripeCustomerId", "password") VALUES ('8629a4fa-73f8-4108-9f98-1e3e3a4bb908', '55Alivia70@yahoo.com', 'David Lee', 'https://i.imgur.com/YfJQV5z.png?id=57', 'cus_J4n3Sm1th456', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');

INSERT INTO "RagVector" ("id", "vectorId") VALUES ('278b4dfc-00a2-4ba0-a4da-891d1c2ad704', 'vec11223');
INSERT INTO "RagVector" ("id", "vectorId") VALUES ('bd6c3afc-ffe2-45db-8fdd-17128b2b2ddd', 'vec54321');
INSERT INTO "RagVector" ("id", "vectorId") VALUES ('96e9b24b-368d-4d0b-a7dc-836d17a9035e', 'vec54321');
INSERT INTO "RagVector" ("id", "vectorId") VALUES ('a05dbfed-4cc0-484a-9d5f-fb23a9a2a6bb', 'vec54321');
INSERT INTO "RagVector" ("id", "vectorId") VALUES ('6f3bde62-aa9c-40d3-b0f0-9b444487bc5d', 'vec09876');
INSERT INTO "RagVector" ("id", "vectorId") VALUES ('178fd41c-874e-4333-b16a-0acfb7c171d7', 'vec11223');
INSERT INTO "RagVector" ("id", "vectorId") VALUES ('5a41a470-e6bc-4aeb-acfe-c02af588393d', 'vec54321');
INSERT INTO "RagVector" ("id", "vectorId") VALUES ('588020cd-5b81-48da-bcc4-8f6dbb12bdd4', 'vec54321');
INSERT INTO "RagVector" ("id", "vectorId") VALUES ('423cc173-f981-4076-bf99-fca6bcc6f273', 'vec09876');
INSERT INTO "RagVector" ("id", "vectorId") VALUES ('26cb8bb3-2611-4117-b73b-9cee4bef87c5', 'vec12345');

INSERT INTO "Project" ("id", "name", "description", "timeEstimate", "budgetBuffer", "location", "benefits", "profitMargin", "userId") VALUES ('e4c497fb-a0b9-45e5-b90c-053ad8f22431', 'Community Health Initiative', 'An effort to promote and implement renewable energy solutions.', 715, 885, 'New York USA', 'Health insurance Retirement plan', 132, '8629a4fa-73f8-4108-9f98-1e3e3a4bb908');
INSERT INTO "Project" ("id", "name", "description", "timeEstimate", "budgetBuffer", "location", "benefits", "profitMargin", "userId") VALUES ('20cb1627-bcbb-4b69-b7f7-0b0d2209be6b', 'Educational Outreach Program', 'A project aimed at improving community health through various initiatives.', 247, 333, 'Berlin Germany', 'Professional development Travel allowances', 92, '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "Project" ("id", "name", "description", "timeEstimate", "budgetBuffer", "location", "benefits", "profitMargin", "userId") VALUES ('f0fe9471-2cc6-4a79-841c-f1e26e3e15af', 'Community Health Initiative', 'An initiative to protect and conserve wildlife habitats.', 455, 283, 'New York USA', 'Professional development Travel allowances', 451, '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "Project" ("id", "name", "description", "timeEstimate", "budgetBuffer", "location", "benefits", "profitMargin", "userId") VALUES ('712b2c5f-68a0-4f61-a8bb-5ef3c1399a0a', 'Renewable Energy Project', 'A project aimed at improving community health through various initiatives.', 729, 860, 'Rio de Janeiro Brazil', 'Gym membership Wellness programs', 552, '8629a4fa-73f8-4108-9f98-1e3e3a4bb908');
INSERT INTO "Project" ("id", "name", "description", "timeEstimate", "budgetBuffer", "location", "benefits", "profitMargin", "userId") VALUES ('884d25e0-4062-4469-b468-b1928ad8ebad', 'Community Health Initiative', 'A program focused on providing educational resources to underprivileged communities.', 22, 148, 'Sydney Australia', 'Flexible working hours Remote work options', 708, '76998da2-3835-48ec-b782-45c7f288f7e8');
INSERT INTO "Project" ("id", "name", "description", "timeEstimate", "budgetBuffer", "location", "benefits", "profitMargin", "userId") VALUES ('6b96110a-8592-4f19-952e-7166304f03e5', 'Educational Outreach Program', 'A project aimed at improving community health through various initiatives.', 927, 416, 'Sydney Australia', 'Gym membership Wellness programs', 945, '0319051a-bde3-4a49-a4c1-34009a11802d');
INSERT INTO "Project" ("id", "name", "description", "timeEstimate", "budgetBuffer", "location", "benefits", "profitMargin", "userId") VALUES ('52ea0bd4-71c2-4ebc-8600-0f6de1497c72', 'Urban Development Plan', 'An effort to promote and implement renewable energy solutions.', 508, 428, 'New York USA', 'Professional development Travel allowances', 916, '0319051a-bde3-4a49-a4c1-34009a11802d');
INSERT INTO "Project" ("id", "name", "description", "timeEstimate", "budgetBuffer", "location", "benefits", "profitMargin", "userId") VALUES ('adae4468-45a4-4425-88fa-5595c6a65602', 'Community Health Initiative', 'An initiative to protect and conserve wildlife habitats.', 539, 663, 'Berlin Germany', 'Professional development Travel allowances', 741, '15951296-2a59-499b-b09c-8f6f3d32391a');
INSERT INTO "Project" ("id", "name", "description", "timeEstimate", "budgetBuffer", "location", "benefits", "profitMargin", "userId") VALUES ('6079b7af-18e0-4ba9-ac1d-599be132cb22', 'Renewable Energy Project', 'A comprehensive plan to develop urban areas sustainably.', 57, 61, 'Berlin Germany', 'Health insurance Retirement plan', 840, '7da60d5d-4dbd-41dc-9236-365492d07f63');
INSERT INTO "Project" ("id", "name", "description", "timeEstimate", "budgetBuffer", "location", "benefits", "profitMargin", "userId") VALUES ('ac0d5656-dd73-42a0-9692-bf142c4316da', 'Urban Development Plan', 'An effort to promote and implement renewable energy solutions.', 122, 809, 'Nairobi Kenya', 'Gym membership Wellness programs', 605, '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');

INSERT INTO "Task" ("id", "name", "description", "duration", "projectId") VALUES ('2689d6fe-a297-47a3-aa5b-972cc9793a32', 'Budget Review', 'Review and adjust the budget based on project progress and new estimates.', 593, 'adae4468-45a4-4425-88fa-5595c6a65602');
INSERT INTO "Task" ("id", "name", "description", "duration", "projectId") VALUES ('ca8f9fba-edc3-4337-bf00-5e685ef20aba', 'Prototype Development', 'Conduct thorough research on market trends and competitor analysis.', 0, '6b96110a-8592-4f19-952e-7166304f03e5');
INSERT INTO "Task" ("id", "name", "description", "duration", "projectId") VALUES ('360389a8-3c90-44b6-b60d-8a918717729a', 'Budget Review', 'Review and adjust the budget based on project progress and new estimates.', 308, 'adae4468-45a4-4425-88fa-5595c6a65602');
INSERT INTO "Task" ("id", "name", "description", "duration", "projectId") VALUES ('745ae70a-7e06-400c-b4be-f9373b8eaf36', 'Budget Review', 'Compile all findings and results into a comprehensive final report.', 485, '6079b7af-18e0-4ba9-ac1d-599be132cb22');
INSERT INTO "Task" ("id", "name", "description", "duration", "projectId") VALUES ('9a055f38-f79f-4926-addd-181356f54670', 'Market Research', 'Compile all findings and results into a comprehensive final report.', 797, '712b2c5f-68a0-4f61-a8bb-5ef3c1399a0a');
INSERT INTO "Task" ("id", "name", "description", "duration", "projectId") VALUES ('ceecb0a6-5bcd-4333-b79d-097169359c3b', 'Prototype Development', 'Review and adjust the budget based on project progress and new estimates.', 436, '6079b7af-18e0-4ba9-ac1d-599be132cb22');
INSERT INTO "Task" ("id", "name", "description", "duration", "projectId") VALUES ('cf01e967-6017-4571-bea2-661c5c5f6b68', 'Prototype Development', 'Compile all findings and results into a comprehensive final report.', 449, 'f0fe9471-2cc6-4a79-841c-f1e26e3e15af');
INSERT INTO "Task" ("id", "name", "description", "duration", "projectId") VALUES ('f2c71a87-7972-4880-957b-9d112bde6842', 'Budget Review', 'Conduct thorough research on market trends and competitor analysis.', 387, 'ac0d5656-dd73-42a0-9692-bf142c4316da');
INSERT INTO "Task" ("id", "name", "description", "duration", "projectId") VALUES ('b342c77b-ebef-4efe-ab15-e587f5b9c859', 'User Testing', 'Conduct thorough research on market trends and competitor analysis.', 470, '6b96110a-8592-4f19-952e-7166304f03e5');
INSERT INTO "Task" ("id", "name", "description", "duration", "projectId") VALUES ('86d757b2-9ded-428e-980d-26580173fff2', 'Market Research', 'Develop a working prototype based on initial designs and specifications.', 205, '6b96110a-8592-4f19-952e-7166304f03e5');

INSERT INTO "RoleData" ("id", "title", "seniority", "projectId") VALUES ('d9aa7beb-b152-4700-8a05-07333b7d3e90', 'Project Manager', 'Principal', 'ac0d5656-dd73-42a0-9692-bf142c4316da');
INSERT INTO "RoleData" ("id", "title", "seniority", "projectId") VALUES ('0e52bccd-95fd-420a-b5f1-c89bfa55378b', 'Quality Assurance Specialist', 'Midlevel', 'e4c497fb-a0b9-45e5-b90c-053ad8f22431');
INSERT INTO "RoleData" ("id", "title", "seniority", "projectId") VALUES ('a7027e0b-a826-4b7e-ab27-c7276dbbd675', 'UX Designer', 'Lead', 'ac0d5656-dd73-42a0-9692-bf142c4316da');
INSERT INTO "RoleData" ("id", "title", "seniority", "projectId") VALUES ('44586aa3-6bb9-4f15-b46e-e2d7086ff861', 'Software Engineer', 'Senior', '52ea0bd4-71c2-4ebc-8600-0f6de1497c72');
INSERT INTO "RoleData" ("id", "title", "seniority", "projectId") VALUES ('34ab62e0-a460-41c1-973b-06860c249813', 'Data Analyst', 'Senior', '6b96110a-8592-4f19-952e-7166304f03e5');
INSERT INTO "RoleData" ("id", "title", "seniority", "projectId") VALUES ('9b2f0bb0-e711-47b7-b546-e11ef661ebfd', 'Project Manager', 'Senior', 'adae4468-45a4-4425-88fa-5595c6a65602');
INSERT INTO "RoleData" ("id", "title", "seniority", "projectId") VALUES ('515c0247-0a56-46f1-9f82-9a3b04d0e1ec', 'Software Engineer', 'Midlevel', '20cb1627-bcbb-4b69-b7f7-0b0d2209be6b');
INSERT INTO "RoleData" ("id", "title", "seniority", "projectId") VALUES ('aaa2eeaa-06ce-4274-a9d8-deaa46f3bc11', 'Project Manager', 'Junior', '20cb1627-bcbb-4b69-b7f7-0b0d2209be6b');
INSERT INTO "RoleData" ("id", "title", "seniority", "projectId") VALUES ('6ea3cf48-0de2-48ec-b292-2660b40ee89c', 'Project Manager', 'Lead', '6079b7af-18e0-4ba9-ac1d-599be132cb22');
INSERT INTO "RoleData" ("id", "title", "seniority", "projectId") VALUES ('9554271c-3b8f-4f48-b020-e6cfb25a5dba', 'Quality Assurance Specialist', 'Senior', 'adae4468-45a4-4425-88fa-5595c6a65602');

INSERT INTO "Staff" ("id", "name", "payroll", "projectId") VALUES ('594812dc-17ab-4a34-ae08-769ba2cd9739', 'Diana Evans', 950, '6079b7af-18e0-4ba9-ac1d-599be132cb22');
INSERT INTO "Staff" ("id", "name", "payroll", "projectId") VALUES ('28e219c8-3942-4973-bc07-187e6cca4032', 'Charlie Davis', 244, '884d25e0-4062-4469-b468-b1928ad8ebad');
INSERT INTO "Staff" ("id", "name", "payroll", "projectId") VALUES ('40976a51-52a0-457d-962d-e4e03dadac2e', 'Ethan Brown', 381, '6b96110a-8592-4f19-952e-7166304f03e5');
INSERT INTO "Staff" ("id", "name", "payroll", "projectId") VALUES ('0fc11492-1359-4c2b-b310-78717c95011f', 'Charlie Davis', 62, '6b96110a-8592-4f19-952e-7166304f03e5');
INSERT INTO "Staff" ("id", "name", "payroll", "projectId") VALUES ('2596c0c5-7c97-4a93-bb42-42685ce31704', 'Ethan Brown', 663, '6b96110a-8592-4f19-952e-7166304f03e5');
INSERT INTO "Staff" ("id", "name", "payroll", "projectId") VALUES ('f0b989fa-db5a-44fc-b776-2e684af772ae', 'Bob Smith', 958, '884d25e0-4062-4469-b468-b1928ad8ebad');
INSERT INTO "Staff" ("id", "name", "payroll", "projectId") VALUES ('78621dda-b195-4faf-92ce-9fcc18f7930a', 'Bob Smith', 449, '884d25e0-4062-4469-b468-b1928ad8ebad');
INSERT INTO "Staff" ("id", "name", "payroll", "projectId") VALUES ('23174ff0-4e89-4849-9955-98d2eee97c10', 'Charlie Davis', 637, '20cb1627-bcbb-4b69-b7f7-0b0d2209be6b');
INSERT INTO "Staff" ("id", "name", "payroll", "projectId") VALUES ('9a9ac2d6-70d8-4aae-a338-49ffd0401d4d', 'Charlie Davis', 897, '712b2c5f-68a0-4f61-a8bb-5ef3c1399a0a');
INSERT INTO "Staff" ("id", "name", "payroll", "projectId") VALUES ('337eb64b-83b7-48b1-a317-0aabb0b507ff', 'Diana Evans', 17, '712b2c5f-68a0-4f61-a8bb-5ef3c1399a0a');

  `

  const sqls = splitSql(sql)

  for (const sql of sqls) {
    try {
      await prisma.$executeRawUnsafe(`${sql}`)
    } catch (error) {
      console.log(`Could not insert SQL: ${error.message}`)
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async error => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
