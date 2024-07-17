SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema You-Kan
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema You-Kan
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `You-Kan` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `You-Kan` ;

-- -----------------------------------------------------
-- Table `You-Kan`.`Users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `You-Kan`.`Users` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(255) NOT NULL,
  `last_name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password_hash` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP NOT NULL,
  PRIMARY KEY (`user_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `You-Kan`.`Projects`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `You-Kan`.`Projects` (
  `project_id` INT NOT NULL AUTO_INCREMENT,
  `project_name` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `creator_user_id` INT NOT NULL,
  PRIMARY KEY (`project_id`, `creator_user_id`),
  INDEX `user_id_idx` (`creator_user_id` ASC) VISIBLE,
  CONSTRAINT `Projects_ibfk_1`
    FOREIGN KEY (`creator_user_id`)
    REFERENCES `You-Kan`.`Users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `You-Kan`.`Sprints`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `You-Kan`.`Sprints` (
  `sprint_id` INT NOT NULL AUTO_INCREMENT,
  `sprint_name` VARCHAR(255) NOT NULL,
  `project_id` INT NOT NULL,
  `start_date` DATE NULL,
  `end_date` DATE NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`sprint_id`, `project_id`),
  INDEX `board_id` (`project_id` ASC) VISIBLE,
  CONSTRAINT `Sprints_ibfk_1`
    FOREIGN KEY (`project_id`)
    REFERENCES `You-Kan`.`Projects` (`project_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `You-Kan`.`Tasks`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `You-Kan`.`Tasks` (
  `task_id` INT NOT NULL AUTO_INCREMENT,
  `task_title` VARCHAR(255) NOT NULL,
  `task_description` VARCHAR(255) NULL DEFAULT NULL,
  `sprint_id` INT NOT NULL,
  `priority` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `status` VARCHAR(255) NOT NULL,
  `creator_user_id` INT NOT NULL,
  `task_type` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`task_id`, `creator_user_id`, `sprint_id`),
  INDEX `creator_user_id` (`creator_user_id` ASC) VISIBLE,
  INDEX `sprint_id_idx` (`sprint_id` ASC) VISIBLE,
  CONSTRAINT `Tasks_ibfk_1`
    FOREIGN KEY (`creator_user_id`)
    REFERENCES `You-Kan`.`Users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `Tasks_ibfk_2`
    FOREIGN KEY (`sprint_id`)
    REFERENCES `You-Kan`.`Sprints` (`sprint_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `You-Kan`.`Comments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `You-Kan`.`Comments` (
  `comment_id` INT NOT NULL,
  `task_id` INT NOT NULL,
  `comment_text` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`comment_id`),
  INDEX `task_id_idx` (`task_id` ASC) VISIBLE,
  INDEX `Comments_ibfk_2` (`user_id` ASC) VISIBLE,
  CONSTRAINT `Comments_ibfk_1`
    FOREIGN KEY (`task_id`)
    REFERENCES `You-Kan`.`Tasks` (`task_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `Comments_ibfk_2`
    FOREIGN KEY (`user_id`)
    REFERENCES `You-Kan`.`Users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `You-Kan`.`Project_Users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `You-Kan`.`Project_Users` (
  `user_id` INT NOT NULL,
  `project_id` INT NOT NULL,
  PRIMARY KEY (`user_id`, `project_id`),
  INDEX `fk_Users_has_Projects_Projects1_idx` (`project_id` ASC) VISIBLE,
  INDEX `fk_Users_has_Projects_Users1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_Users_has_Projects_Users1`
    FOREIGN KEY (`user_id`)
    REFERENCES `You-Kan`.`Users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Users_has_Projects_Projects1`
    FOREIGN KEY (`project_id`)
    REFERENCES `You-Kan`.`Projects` (`project_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `You-Kan`.`Task_Assignees`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `You-Kan`.`Task_Assignees` (
  `user_id` INT NOT NULL,
  `task_id` INT NOT NULL,
  PRIMARY KEY (`user_id`, `task_id`),
  INDEX `fk_Users_has_Tasks_Tasks1_idx` (`task_id` ASC) VISIBLE,
  INDEX `fk_Users_has_Tasks_Users1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_Users_has_Tasks_Users1`
    FOREIGN KEY (`user_id`)
    REFERENCES `You-Kan`.`Users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Users_has_Tasks_Tasks1`
    FOREIGN KEY (`task_id`)
    REFERENCES `You-Kan`.`Tasks` (`task_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
