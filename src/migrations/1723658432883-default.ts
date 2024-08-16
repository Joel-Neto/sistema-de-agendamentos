import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1723658432883 implements MigrationInterface {
    name = 'Default1723658432883'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`files\` CHANGE \`created_at\` \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`files\` CHANGE \`updated_at\` \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`appoointments\` DROP FOREIGN KEY \`FK_b8fdb3961fccfbad535381076ad\``);
        await queryRunner.query(`ALTER TABLE \`appoointments\` DROP FOREIGN KEY \`FK_8f6faf287c49673786d67bd85fa\``);
        await queryRunner.query(`ALTER TABLE \`appoointments\` CHANGE \`canceled_at\` \`canceled_at\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`appoointments\` CHANGE \`created_at\` \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`appoointments\` CHANGE \`updated_at\` \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`appoointments\` CHANGE \`user_id\` \`user_id\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`appoointments\` CHANGE \`provider_id\` \`provider_id\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_c3401836efedec3bec459c8f818\``);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`created_at\` \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`updated_at\` \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`avatar_id\` \`avatar_id\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`appoointments\` ADD CONSTRAINT \`FK_b8fdb3961fccfbad535381076ad\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`appoointments\` ADD CONSTRAINT \`FK_8f6faf287c49673786d67bd85fa\` FOREIGN KEY (\`provider_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_c3401836efedec3bec459c8f818\` FOREIGN KEY (\`avatar_id\`) REFERENCES \`files\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_c3401836efedec3bec459c8f818\``);
        await queryRunner.query(`ALTER TABLE \`appoointments\` DROP FOREIGN KEY \`FK_8f6faf287c49673786d67bd85fa\``);
        await queryRunner.query(`ALTER TABLE \`appoointments\` DROP FOREIGN KEY \`FK_b8fdb3961fccfbad535381076ad\``);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`avatar_id\` \`avatar_id\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`updated_at\` \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`created_at\` \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_c3401836efedec3bec459c8f818\` FOREIGN KEY (\`avatar_id\`) REFERENCES \`files\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`appoointments\` CHANGE \`provider_id\` \`provider_id\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`appoointments\` CHANGE \`user_id\` \`user_id\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`appoointments\` CHANGE \`updated_at\` \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`appoointments\` CHANGE \`created_at\` \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`appoointments\` CHANGE \`canceled_at\` \`canceled_at\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`appoointments\` ADD CONSTRAINT \`FK_8f6faf287c49673786d67bd85fa\` FOREIGN KEY (\`provider_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`appoointments\` ADD CONSTRAINT \`FK_b8fdb3961fccfbad535381076ad\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`files\` CHANGE \`updated_at\` \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`files\` CHANGE \`created_at\` \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
    }

}
