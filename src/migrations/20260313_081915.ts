import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_users_role" AS ENUM('superAdmin', 'tenantAdmin', 'manager', 'employee');
  CREATE TYPE "public"."enum_tenants_plan" AS ENUM('starter', 'business', 'network', 'enterprise');
  CREATE TYPE "public"."enum_tenants_settings_language" AS ENUM('ru', 'en');
  CREATE TYPE "public"."enum_restaurants_opening_hours_day" AS ENUM('mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun');
  CREATE TYPE "public"."enum_restaurants_type" AS ENUM('restaurant', 'cafe', 'bar', 'fastfood', 'coffee', 'canteen', 'pizzeria', 'other');
  CREATE TYPE "public"."enum_departments_icon" AS ENUM('kitchen', 'hall', 'bar', 'delivery', 'admin', 'cleaning', 'warehouse', 'cashier');
  CREATE TYPE "public"."enum_positions_access_level" AS ENUM('employee', 'shiftManager', 'manager', 'admin');
  CREATE TYPE "public"."enum_employees_documents_type" AS ENUM('contract', 'health', 'passport', 'inn', 'other');
  CREATE TYPE "public"."enum_employees_status" AS ENUM('active', 'vacation', 'sick', 'fired', 'probation');
  CREATE TYPE "public"."enum_employees_employment_type" AS ENUM('full', 'part', 'intern', 'temporary');
  CREATE TYPE "public"."enum_employees_salary_type" AS ENUM('hourly', 'salary', 'mixed');
  CREATE TYPE "public"."enum_courses_status" AS ENUM('draft', 'published', 'archived');
  CREATE TYPE "public"."enum_courses_category" AS ENUM('menu', 'safety', 'service', 'operations', 'hr', 'sales', 'onboarding');
  CREATE TYPE "public"."enum_lessons_type" AS ENUM('text', 'video', 'pdf', 'quiz', 'practical');
  CREATE TYPE "public"."enum_quizzes_questions_type" AS ENUM('single', 'multiple', 'text', 'boolean');
  CREATE TYPE "public"."enum_quizzes_questions_boolean_answer" AS ENUM('true', 'false');
  CREATE TYPE "public"."enum_enrollments_status" AS ENUM('not_started', 'in_progress', 'completed', 'failed', 'overdue');
  CREATE TYPE "public"."enum_shifts_status" AS ENUM('draft', 'published', 'active', 'completed', 'cancelled');
  CREATE TYPE "public"."enum_shift_assignments_status" AS ENUM('scheduled', 'confirmed', 'completed', 'absent', 'late', 'replacement');
  CREATE TYPE "public"."enum_tasks_category" AS ENUM('cleaning', 'kitchen', 'service', 'inventory', 'technical', 'other');
  CREATE TYPE "public"."enum_tasks_priority" AS ENUM('low', 'normal', 'high', 'urgent');
  CREATE TYPE "public"."enum_tasks_status" AS ENUM('pending', 'in_progress', 'done', 'cancelled');
  CREATE TYPE "public"."enum_checklists_type" AS ENUM('opening', 'closing', 'cleaning', 'safety', 'inventory', 'other');
  CREATE TYPE "public"."enum_checklists_frequency" AS ENUM('daily', 'weekly', 'monthly', 'per_shift');
  CREATE TYPE "public"."enum_checklist_completions_overall_status" AS ENUM('in_progress', 'completed', 'completed_with_issues', 'failed');
  CREATE TYPE "public"."enum_announcements_priority" AS ENUM('normal', 'high', 'urgent');
  CREATE TYPE "public"."enum_documents_category" AS ENUM('sop', 'menu', 'safety', 'hr', 'reports', 'other');
  CREATE TYPE "public"."enum_incident_reports_type" AS ENUM('accident', 'complaint', 'quality', 'equipment', 'standard', 'theft', 'other');
  CREATE TYPE "public"."enum_incident_reports_severity" AS ENUM('low', 'medium', 'high', 'critical');
  CREATE TYPE "public"."enum_incident_reports_status" AS ENUM('open', 'in_progress', 'resolved', 'closed');
  CREATE TABLE "tenants" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"logo_id" integer,
  	"plan" "enum_tenants_plan" DEFAULT 'starter' NOT NULL,
  	"plan_expires_at" timestamp(3) with time zone,
  	"is_active" boolean DEFAULT true,
  	"contact_email" varchar,
  	"contact_phone" varchar,
  	"billing_email" varchar,
  	"max_locations" numeric DEFAULT 1,
  	"settings_timezone" varchar DEFAULT 'Europe/Moscow',
  	"settings_language" "enum_tenants_settings_language" DEFAULT 'ru',
  	"settings_enable_training" boolean DEFAULT true,
  	"settings_enable_shifts" boolean DEFAULT true,
  	"settings_enable_checklists" boolean DEFAULT true,
  	"settings_enable_incidents" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "restaurants_opening_hours" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"day" "enum_restaurants_opening_hours_day",
  	"open" varchar,
  	"close" varchar,
  	"is_closed" boolean
  );
  
  CREATE TABLE "restaurants" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"tenant_id" integer NOT NULL,
  	"logo_id" integer,
  	"type" "enum_restaurants_type",
  	"city" varchar,
  	"address" varchar,
  	"phone" varchar,
  	"email" varchar,
  	"timezone" varchar DEFAULT 'Europe/Moscow',
  	"is_active" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "departments" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"restaurant_id" integer NOT NULL,
  	"description" varchar,
  	"color" varchar DEFAULT '#6366f1',
  	"icon" "enum_departments_icon",
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "positions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"restaurant_id" integer NOT NULL,
  	"department_id" integer,
  	"access_level" "enum_positions_access_level" DEFAULT 'employee' NOT NULL,
  	"description" varchar,
  	"responsibilities" jsonb,
  	"requirements" jsonb,
  	"color" varchar,
  	"hourly_rate" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "employees_documents" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_employees_documents_type",
  	"title" varchar,
  	"file_id" integer,
  	"expires_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "employees" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"full_name" varchar NOT NULL,
  	"user_id" integer,
  	"restaurant_id" integer NOT NULL,
  	"position_id" integer,
  	"department_id" integer,
  	"status" "enum_employees_status" DEFAULT 'active',
  	"avatar_id" integer,
  	"phone" varchar,
  	"email" varchar,
  	"hire_date" timestamp(3) with time zone,
  	"birth_date" timestamp(3) with time zone,
  	"employment_type" "enum_employees_employment_type",
  	"notes" varchar,
  	"emergency_contact_name" varchar,
  	"emergency_contact_relation" varchar,
  	"emergency_contact_phone" varchar,
  	"salary_type" "enum_employees_salary_type",
  	"salary_hourly_rate" numeric,
  	"salary_monthly_salary" numeric,
  	"salary_bank_account" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "courses" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"restaurant_id" integer,
  	"status" "enum_courses_status" DEFAULT 'draft',
  	"is_required" boolean DEFAULT false,
  	"recertification_months" numeric,
  	"thumbnail_id" integer,
  	"description" jsonb,
  	"category" "enum_courses_category",
  	"estimated_duration" numeric,
  	"passing_score" numeric DEFAULT 80,
  	"certificate_enabled" boolean DEFAULT false,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "courses_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"positions_id" integer,
  	"departments_id" integer
  );
  
  CREATE TABLE "lessons_practical_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"task" varchar,
  	"description" varchar,
  	"requires_photo" boolean
  );
  
  CREATE TABLE "lessons" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"course_id" integer NOT NULL,
  	"order" numeric DEFAULT 0,
  	"type" "enum_lessons_type" DEFAULT 'text' NOT NULL,
  	"content" jsonb,
  	"video_url" varchar,
  	"video_file_id" integer,
  	"document_id" integer,
  	"duration" numeric,
  	"is_mandatory" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "quizzes_questions_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"is_correct" boolean
  );
  
  CREATE TABLE "quizzes_questions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"image_id" integer,
  	"type" "enum_quizzes_questions_type" DEFAULT 'single' NOT NULL,
  	"correct_answer" varchar,
  	"boolean_answer" "enum_quizzes_questions_boolean_answer",
  	"explanation" varchar,
  	"points" numeric DEFAULT 1
  );
  
  CREATE TABLE "quizzes" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"lesson_id" integer,
  	"course_id" integer,
  	"passing_score" numeric DEFAULT 80 NOT NULL,
  	"time_limit" numeric,
  	"max_attempts" numeric DEFAULT 3,
  	"shuffle_questions" boolean DEFAULT true,
  	"show_correct_answers" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "quiz_attempts_answers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question_index" numeric,
  	"selected_options" varchar,
  	"is_correct" boolean,
  	"points_earned" numeric
  );
  
  CREATE TABLE "quiz_attempts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"employee_id" integer NOT NULL,
  	"quiz_id" integer NOT NULL,
  	"score" numeric NOT NULL,
  	"passed" boolean,
  	"time_taken" numeric,
  	"attempt_number" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "enrollments_completed_lessons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"lesson_id" integer,
  	"completed_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "enrollments" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"employee_id" integer NOT NULL,
  	"course_id" integer NOT NULL,
  	"status" "enum_enrollments_status" DEFAULT 'not_started' NOT NULL,
  	"progress" numeric DEFAULT 0,
  	"started_at" timestamp(3) with time zone,
  	"completed_at" timestamp(3) with time zone,
  	"due_date" timestamp(3) with time zone,
  	"score" numeric,
  	"certificate_issued_at" timestamp(3) with time zone,
  	"next_recertification_at" timestamp(3) with time zone,
  	"assigned_by_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "shifts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"restaurant_id" integer NOT NULL,
  	"date" timestamp(3) with time zone NOT NULL,
  	"start_time" varchar NOT NULL,
  	"end_time" varchar NOT NULL,
  	"department_id" integer,
  	"status" "enum_shifts_status" DEFAULT 'draft',
  	"required_count" numeric DEFAULT 1,
  	"notes" varchar,
  	"employee_notes" varchar,
  	"opened_at" timestamp(3) with time zone,
  	"closed_at" timestamp(3) with time zone,
  	"opened_by_id" integer,
  	"closed_by_id" integer,
  	"shift_report" jsonb,
  	"revenue" numeric,
  	"covers" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "shift_assignments" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"shift_id" integer NOT NULL,
  	"employee_id" integer NOT NULL,
  	"position_id" integer,
  	"status" "enum_shift_assignments_status" DEFAULT 'scheduled',
  	"clock_in" timestamp(3) with time zone,
  	"clock_out" timestamp(3) with time zone,
  	"hours_worked" numeric,
  	"notes" varchar,
  	"manager_notes" varchar,
  	"is_swap_request" boolean DEFAULT false,
  	"swap_with_id" integer,
  	"swap_approved_by_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "tasks" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"restaurant_id" integer NOT NULL,
  	"shift_id" integer,
  	"assigned_to_id" integer,
  	"category" "enum_tasks_category",
  	"priority" "enum_tasks_priority" DEFAULT 'normal',
  	"status" "enum_tasks_status" DEFAULT 'pending',
  	"due_time" varchar,
  	"completed_at" timestamp(3) with time zone,
  	"completed_by_id" integer,
  	"photo_id" integer,
  	"is_recurring" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "checklists_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"is_required" boolean DEFAULT true,
  	"requires_photo" boolean DEFAULT false,
  	"category" varchar
  );
  
  CREATE TABLE "checklists" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"restaurant_id" integer NOT NULL,
  	"type" "enum_checklists_type" NOT NULL,
  	"department_id" integer,
  	"frequency" "enum_checklists_frequency" DEFAULT 'daily',
  	"is_active" boolean DEFAULT true,
  	"description" varchar,
  	"estimated_time" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "checklist_completions_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item_title" varchar,
  	"is_completed" boolean,
  	"notes" varchar,
  	"photo_id" integer
  );
  
  CREATE TABLE "checklist_completions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"checklist_id" integer NOT NULL,
  	"restaurant_id" integer NOT NULL,
  	"shift_id" integer,
  	"completed_by_id" integer NOT NULL,
  	"completed_at" timestamp(3) with time zone,
  	"overall_status" "enum_checklist_completions_overall_status" DEFAULT 'in_progress',
  	"manager_approved_by_id" integer,
  	"manager_approved_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "announcements_attachments" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"file_id" integer,
  	"title" varchar
  );
  
  CREATE TABLE "announcements_read_by" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"employee_id" integer,
  	"read_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "announcements" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"restaurant_id" integer NOT NULL,
  	"priority" "enum_announcements_priority" DEFAULT 'normal',
  	"is_pinned" boolean DEFAULT false,
  	"content" jsonb NOT NULL,
  	"published_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone,
  	"author_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "announcements_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"departments_id" integer,
  	"positions_id" integer
  );
  
  CREATE TABLE "documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"restaurant_id" integer,
  	"category" "enum_documents_category",
  	"description" varchar,
  	"content" jsonb,
  	"file_id" integer,
  	"version" varchar DEFAULT '1.0',
  	"is_public" boolean DEFAULT true,
  	"tags" varchar,
  	"updated_by_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"departments_id" integer
  );
  
  CREATE TABLE "incident_reports_photos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"photo_id" integer,
  	"caption" varchar
  );
  
  CREATE TABLE "incident_reports" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"restaurant_id" integer NOT NULL,
  	"type" "enum_incident_reports_type" NOT NULL,
  	"severity" "enum_incident_reports_severity" DEFAULT 'low',
  	"status" "enum_incident_reports_status" DEFAULT 'open',
  	"description" jsonb NOT NULL,
  	"shift_id" integer,
  	"reported_by_id" integer,
  	"resolution" jsonb,
  	"resolved_by_id" integer,
  	"resolved_at" timestamp(3) with time zone,
  	"preventive_measures" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "incident_reports_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"employees_id" integer
  );
  
  ALTER TABLE "users" ALTER COLUMN "name" SET NOT NULL;
  ALTER TABLE "users" ADD COLUMN "role" "enum_users_role" DEFAULT 'employee' NOT NULL;
  ALTER TABLE "users" ADD COLUMN "tenant_id" integer;
  ALTER TABLE "users" ADD COLUMN "restaurant_id" integer;
  ALTER TABLE "users" ADD COLUMN "avatar_id" integer;
  ALTER TABLE "users" ADD COLUMN "phone" varchar;
  ALTER TABLE "users" ADD COLUMN "is_active" boolean DEFAULT true;
  ALTER TABLE "users" ADD COLUMN "last_seen" timestamp(3) with time zone;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "tenants_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "restaurants_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "departments_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "positions_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "employees_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "courses_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "lessons_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "quizzes_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "quiz_attempts_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "enrollments_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "shifts_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "shift_assignments_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "tasks_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "checklists_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "checklist_completions_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "announcements_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "documents_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "incident_reports_id" integer;
  ALTER TABLE "tenants" ADD CONSTRAINT "tenants_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "restaurants_opening_hours" ADD CONSTRAINT "restaurants_opening_hours_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."restaurants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "restaurants" ADD CONSTRAINT "restaurants_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "restaurants" ADD CONSTRAINT "restaurants_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "departments" ADD CONSTRAINT "departments_restaurant_id_restaurants_id_fk" FOREIGN KEY ("restaurant_id") REFERENCES "public"."restaurants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "positions" ADD CONSTRAINT "positions_restaurant_id_restaurants_id_fk" FOREIGN KEY ("restaurant_id") REFERENCES "public"."restaurants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "positions" ADD CONSTRAINT "positions_department_id_departments_id_fk" FOREIGN KEY ("department_id") REFERENCES "public"."departments"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "employees_documents" ADD CONSTRAINT "employees_documents_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "employees_documents" ADD CONSTRAINT "employees_documents_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."employees"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "employees" ADD CONSTRAINT "employees_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "employees" ADD CONSTRAINT "employees_restaurant_id_restaurants_id_fk" FOREIGN KEY ("restaurant_id") REFERENCES "public"."restaurants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "employees" ADD CONSTRAINT "employees_position_id_positions_id_fk" FOREIGN KEY ("position_id") REFERENCES "public"."positions"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "employees" ADD CONSTRAINT "employees_department_id_departments_id_fk" FOREIGN KEY ("department_id") REFERENCES "public"."departments"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "employees" ADD CONSTRAINT "employees_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "courses" ADD CONSTRAINT "courses_restaurant_id_restaurants_id_fk" FOREIGN KEY ("restaurant_id") REFERENCES "public"."restaurants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "courses" ADD CONSTRAINT "courses_thumbnail_id_media_id_fk" FOREIGN KEY ("thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "courses_rels" ADD CONSTRAINT "courses_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_rels" ADD CONSTRAINT "courses_rels_positions_fk" FOREIGN KEY ("positions_id") REFERENCES "public"."positions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_rels" ADD CONSTRAINT "courses_rels_departments_fk" FOREIGN KEY ("departments_id") REFERENCES "public"."departments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "lessons_practical_items" ADD CONSTRAINT "lessons_practical_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."lessons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "lessons" ADD CONSTRAINT "lessons_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "lessons" ADD CONSTRAINT "lessons_video_file_id_media_id_fk" FOREIGN KEY ("video_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "lessons" ADD CONSTRAINT "lessons_document_id_media_id_fk" FOREIGN KEY ("document_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "quizzes_questions_options" ADD CONSTRAINT "quizzes_questions_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."quizzes_questions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "quizzes_questions" ADD CONSTRAINT "quizzes_questions_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "quizzes_questions" ADD CONSTRAINT "quizzes_questions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."quizzes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "quizzes" ADD CONSTRAINT "quizzes_lesson_id_lessons_id_fk" FOREIGN KEY ("lesson_id") REFERENCES "public"."lessons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "quizzes" ADD CONSTRAINT "quizzes_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "quiz_attempts_answers" ADD CONSTRAINT "quiz_attempts_answers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."quiz_attempts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "quiz_attempts" ADD CONSTRAINT "quiz_attempts_employee_id_employees_id_fk" FOREIGN KEY ("employee_id") REFERENCES "public"."employees"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "quiz_attempts" ADD CONSTRAINT "quiz_attempts_quiz_id_quizzes_id_fk" FOREIGN KEY ("quiz_id") REFERENCES "public"."quizzes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "enrollments_completed_lessons" ADD CONSTRAINT "enrollments_completed_lessons_lesson_id_lessons_id_fk" FOREIGN KEY ("lesson_id") REFERENCES "public"."lessons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "enrollments_completed_lessons" ADD CONSTRAINT "enrollments_completed_lessons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."enrollments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_employee_id_employees_id_fk" FOREIGN KEY ("employee_id") REFERENCES "public"."employees"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_assigned_by_id_users_id_fk" FOREIGN KEY ("assigned_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "shifts" ADD CONSTRAINT "shifts_restaurant_id_restaurants_id_fk" FOREIGN KEY ("restaurant_id") REFERENCES "public"."restaurants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "shifts" ADD CONSTRAINT "shifts_department_id_departments_id_fk" FOREIGN KEY ("department_id") REFERENCES "public"."departments"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "shifts" ADD CONSTRAINT "shifts_opened_by_id_employees_id_fk" FOREIGN KEY ("opened_by_id") REFERENCES "public"."employees"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "shifts" ADD CONSTRAINT "shifts_closed_by_id_employees_id_fk" FOREIGN KEY ("closed_by_id") REFERENCES "public"."employees"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "shift_assignments" ADD CONSTRAINT "shift_assignments_shift_id_shifts_id_fk" FOREIGN KEY ("shift_id") REFERENCES "public"."shifts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "shift_assignments" ADD CONSTRAINT "shift_assignments_employee_id_employees_id_fk" FOREIGN KEY ("employee_id") REFERENCES "public"."employees"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "shift_assignments" ADD CONSTRAINT "shift_assignments_position_id_positions_id_fk" FOREIGN KEY ("position_id") REFERENCES "public"."positions"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "shift_assignments" ADD CONSTRAINT "shift_assignments_swap_with_id_employees_id_fk" FOREIGN KEY ("swap_with_id") REFERENCES "public"."employees"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "shift_assignments" ADD CONSTRAINT "shift_assignments_swap_approved_by_id_users_id_fk" FOREIGN KEY ("swap_approved_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "tasks" ADD CONSTRAINT "tasks_restaurant_id_restaurants_id_fk" FOREIGN KEY ("restaurant_id") REFERENCES "public"."restaurants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "tasks" ADD CONSTRAINT "tasks_shift_id_shifts_id_fk" FOREIGN KEY ("shift_id") REFERENCES "public"."shifts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "tasks" ADD CONSTRAINT "tasks_assigned_to_id_employees_id_fk" FOREIGN KEY ("assigned_to_id") REFERENCES "public"."employees"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "tasks" ADD CONSTRAINT "tasks_completed_by_id_employees_id_fk" FOREIGN KEY ("completed_by_id") REFERENCES "public"."employees"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "tasks" ADD CONSTRAINT "tasks_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "checklists_items" ADD CONSTRAINT "checklists_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."checklists"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "checklists" ADD CONSTRAINT "checklists_restaurant_id_restaurants_id_fk" FOREIGN KEY ("restaurant_id") REFERENCES "public"."restaurants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "checklists" ADD CONSTRAINT "checklists_department_id_departments_id_fk" FOREIGN KEY ("department_id") REFERENCES "public"."departments"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "checklist_completions_items" ADD CONSTRAINT "checklist_completions_items_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "checklist_completions_items" ADD CONSTRAINT "checklist_completions_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."checklist_completions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "checklist_completions" ADD CONSTRAINT "checklist_completions_checklist_id_checklists_id_fk" FOREIGN KEY ("checklist_id") REFERENCES "public"."checklists"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "checklist_completions" ADD CONSTRAINT "checklist_completions_restaurant_id_restaurants_id_fk" FOREIGN KEY ("restaurant_id") REFERENCES "public"."restaurants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "checklist_completions" ADD CONSTRAINT "checklist_completions_shift_id_shifts_id_fk" FOREIGN KEY ("shift_id") REFERENCES "public"."shifts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "checklist_completions" ADD CONSTRAINT "checklist_completions_completed_by_id_employees_id_fk" FOREIGN KEY ("completed_by_id") REFERENCES "public"."employees"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "checklist_completions" ADD CONSTRAINT "checklist_completions_manager_approved_by_id_employees_id_fk" FOREIGN KEY ("manager_approved_by_id") REFERENCES "public"."employees"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "announcements_attachments" ADD CONSTRAINT "announcements_attachments_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "announcements_attachments" ADD CONSTRAINT "announcements_attachments_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."announcements"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "announcements_read_by" ADD CONSTRAINT "announcements_read_by_employee_id_employees_id_fk" FOREIGN KEY ("employee_id") REFERENCES "public"."employees"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "announcements_read_by" ADD CONSTRAINT "announcements_read_by_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."announcements"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "announcements" ADD CONSTRAINT "announcements_restaurant_id_restaurants_id_fk" FOREIGN KEY ("restaurant_id") REFERENCES "public"."restaurants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "announcements" ADD CONSTRAINT "announcements_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "announcements_rels" ADD CONSTRAINT "announcements_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."announcements"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "announcements_rels" ADD CONSTRAINT "announcements_rels_departments_fk" FOREIGN KEY ("departments_id") REFERENCES "public"."departments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "announcements_rels" ADD CONSTRAINT "announcements_rels_positions_fk" FOREIGN KEY ("positions_id") REFERENCES "public"."positions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "documents" ADD CONSTRAINT "documents_restaurant_id_restaurants_id_fk" FOREIGN KEY ("restaurant_id") REFERENCES "public"."restaurants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "documents" ADD CONSTRAINT "documents_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "documents" ADD CONSTRAINT "documents_updated_by_id_users_id_fk" FOREIGN KEY ("updated_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "documents_rels" ADD CONSTRAINT "documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "documents_rels" ADD CONSTRAINT "documents_rels_departments_fk" FOREIGN KEY ("departments_id") REFERENCES "public"."departments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "incident_reports_photos" ADD CONSTRAINT "incident_reports_photos_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "incident_reports_photos" ADD CONSTRAINT "incident_reports_photos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."incident_reports"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "incident_reports" ADD CONSTRAINT "incident_reports_restaurant_id_restaurants_id_fk" FOREIGN KEY ("restaurant_id") REFERENCES "public"."restaurants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "incident_reports" ADD CONSTRAINT "incident_reports_shift_id_shifts_id_fk" FOREIGN KEY ("shift_id") REFERENCES "public"."shifts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "incident_reports" ADD CONSTRAINT "incident_reports_reported_by_id_employees_id_fk" FOREIGN KEY ("reported_by_id") REFERENCES "public"."employees"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "incident_reports" ADD CONSTRAINT "incident_reports_resolved_by_id_users_id_fk" FOREIGN KEY ("resolved_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "incident_reports_rels" ADD CONSTRAINT "incident_reports_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."incident_reports"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "incident_reports_rels" ADD CONSTRAINT "incident_reports_rels_employees_fk" FOREIGN KEY ("employees_id") REFERENCES "public"."employees"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "tenants_slug_idx" ON "tenants" USING btree ("slug");
  CREATE INDEX "tenants_logo_idx" ON "tenants" USING btree ("logo_id");
  CREATE INDEX "tenants_updated_at_idx" ON "tenants" USING btree ("updated_at");
  CREATE INDEX "tenants_created_at_idx" ON "tenants" USING btree ("created_at");
  CREATE INDEX "restaurants_opening_hours_order_idx" ON "restaurants_opening_hours" USING btree ("_order");
  CREATE INDEX "restaurants_opening_hours_parent_id_idx" ON "restaurants_opening_hours" USING btree ("_parent_id");
  CREATE INDEX "restaurants_tenant_idx" ON "restaurants" USING btree ("tenant_id");
  CREATE INDEX "restaurants_logo_idx" ON "restaurants" USING btree ("logo_id");
  CREATE INDEX "restaurants_updated_at_idx" ON "restaurants" USING btree ("updated_at");
  CREATE INDEX "restaurants_created_at_idx" ON "restaurants" USING btree ("created_at");
  CREATE INDEX "departments_restaurant_idx" ON "departments" USING btree ("restaurant_id");
  CREATE INDEX "departments_updated_at_idx" ON "departments" USING btree ("updated_at");
  CREATE INDEX "departments_created_at_idx" ON "departments" USING btree ("created_at");
  CREATE INDEX "positions_restaurant_idx" ON "positions" USING btree ("restaurant_id");
  CREATE INDEX "positions_department_idx" ON "positions" USING btree ("department_id");
  CREATE INDEX "positions_updated_at_idx" ON "positions" USING btree ("updated_at");
  CREATE INDEX "positions_created_at_idx" ON "positions" USING btree ("created_at");
  CREATE INDEX "employees_documents_order_idx" ON "employees_documents" USING btree ("_order");
  CREATE INDEX "employees_documents_parent_id_idx" ON "employees_documents" USING btree ("_parent_id");
  CREATE INDEX "employees_documents_file_idx" ON "employees_documents" USING btree ("file_id");
  CREATE UNIQUE INDEX "employees_user_idx" ON "employees" USING btree ("user_id");
  CREATE INDEX "employees_restaurant_idx" ON "employees" USING btree ("restaurant_id");
  CREATE INDEX "employees_position_idx" ON "employees" USING btree ("position_id");
  CREATE INDEX "employees_department_idx" ON "employees" USING btree ("department_id");
  CREATE INDEX "employees_avatar_idx" ON "employees" USING btree ("avatar_id");
  CREATE INDEX "employees_updated_at_idx" ON "employees" USING btree ("updated_at");
  CREATE INDEX "employees_created_at_idx" ON "employees" USING btree ("created_at");
  CREATE INDEX "courses_restaurant_idx" ON "courses" USING btree ("restaurant_id");
  CREATE INDEX "courses_thumbnail_idx" ON "courses" USING btree ("thumbnail_id");
  CREATE INDEX "courses_updated_at_idx" ON "courses" USING btree ("updated_at");
  CREATE INDEX "courses_created_at_idx" ON "courses" USING btree ("created_at");
  CREATE INDEX "courses_rels_order_idx" ON "courses_rels" USING btree ("order");
  CREATE INDEX "courses_rels_parent_idx" ON "courses_rels" USING btree ("parent_id");
  CREATE INDEX "courses_rels_path_idx" ON "courses_rels" USING btree ("path");
  CREATE INDEX "courses_rels_positions_id_idx" ON "courses_rels" USING btree ("positions_id");
  CREATE INDEX "courses_rels_departments_id_idx" ON "courses_rels" USING btree ("departments_id");
  CREATE INDEX "lessons_practical_items_order_idx" ON "lessons_practical_items" USING btree ("_order");
  CREATE INDEX "lessons_practical_items_parent_id_idx" ON "lessons_practical_items" USING btree ("_parent_id");
  CREATE INDEX "lessons_course_idx" ON "lessons" USING btree ("course_id");
  CREATE INDEX "lessons_video_file_idx" ON "lessons" USING btree ("video_file_id");
  CREATE INDEX "lessons_document_idx" ON "lessons" USING btree ("document_id");
  CREATE INDEX "lessons_updated_at_idx" ON "lessons" USING btree ("updated_at");
  CREATE INDEX "lessons_created_at_idx" ON "lessons" USING btree ("created_at");
  CREATE INDEX "quizzes_questions_options_order_idx" ON "quizzes_questions_options" USING btree ("_order");
  CREATE INDEX "quizzes_questions_options_parent_id_idx" ON "quizzes_questions_options" USING btree ("_parent_id");
  CREATE INDEX "quizzes_questions_order_idx" ON "quizzes_questions" USING btree ("_order");
  CREATE INDEX "quizzes_questions_parent_id_idx" ON "quizzes_questions" USING btree ("_parent_id");
  CREATE INDEX "quizzes_questions_image_idx" ON "quizzes_questions" USING btree ("image_id");
  CREATE INDEX "quizzes_lesson_idx" ON "quizzes" USING btree ("lesson_id");
  CREATE INDEX "quizzes_course_idx" ON "quizzes" USING btree ("course_id");
  CREATE INDEX "quizzes_updated_at_idx" ON "quizzes" USING btree ("updated_at");
  CREATE INDEX "quizzes_created_at_idx" ON "quizzes" USING btree ("created_at");
  CREATE INDEX "quiz_attempts_answers_order_idx" ON "quiz_attempts_answers" USING btree ("_order");
  CREATE INDEX "quiz_attempts_answers_parent_id_idx" ON "quiz_attempts_answers" USING btree ("_parent_id");
  CREATE INDEX "quiz_attempts_employee_idx" ON "quiz_attempts" USING btree ("employee_id");
  CREATE INDEX "quiz_attempts_quiz_idx" ON "quiz_attempts" USING btree ("quiz_id");
  CREATE INDEX "quiz_attempts_updated_at_idx" ON "quiz_attempts" USING btree ("updated_at");
  CREATE INDEX "quiz_attempts_created_at_idx" ON "quiz_attempts" USING btree ("created_at");
  CREATE INDEX "enrollments_completed_lessons_order_idx" ON "enrollments_completed_lessons" USING btree ("_order");
  CREATE INDEX "enrollments_completed_lessons_parent_id_idx" ON "enrollments_completed_lessons" USING btree ("_parent_id");
  CREATE INDEX "enrollments_completed_lessons_lesson_idx" ON "enrollments_completed_lessons" USING btree ("lesson_id");
  CREATE INDEX "enrollments_employee_idx" ON "enrollments" USING btree ("employee_id");
  CREATE INDEX "enrollments_course_idx" ON "enrollments" USING btree ("course_id");
  CREATE INDEX "enrollments_assigned_by_idx" ON "enrollments" USING btree ("assigned_by_id");
  CREATE INDEX "enrollments_updated_at_idx" ON "enrollments" USING btree ("updated_at");
  CREATE INDEX "enrollments_created_at_idx" ON "enrollments" USING btree ("created_at");
  CREATE INDEX "shifts_restaurant_idx" ON "shifts" USING btree ("restaurant_id");
  CREATE INDEX "shifts_department_idx" ON "shifts" USING btree ("department_id");
  CREATE INDEX "shifts_opened_by_idx" ON "shifts" USING btree ("opened_by_id");
  CREATE INDEX "shifts_closed_by_idx" ON "shifts" USING btree ("closed_by_id");
  CREATE INDEX "shifts_updated_at_idx" ON "shifts" USING btree ("updated_at");
  CREATE INDEX "shifts_created_at_idx" ON "shifts" USING btree ("created_at");
  CREATE INDEX "shift_assignments_shift_idx" ON "shift_assignments" USING btree ("shift_id");
  CREATE INDEX "shift_assignments_employee_idx" ON "shift_assignments" USING btree ("employee_id");
  CREATE INDEX "shift_assignments_position_idx" ON "shift_assignments" USING btree ("position_id");
  CREATE INDEX "shift_assignments_swap_with_idx" ON "shift_assignments" USING btree ("swap_with_id");
  CREATE INDEX "shift_assignments_swap_approved_by_idx" ON "shift_assignments" USING btree ("swap_approved_by_id");
  CREATE INDEX "shift_assignments_updated_at_idx" ON "shift_assignments" USING btree ("updated_at");
  CREATE INDEX "shift_assignments_created_at_idx" ON "shift_assignments" USING btree ("created_at");
  CREATE INDEX "tasks_restaurant_idx" ON "tasks" USING btree ("restaurant_id");
  CREATE INDEX "tasks_shift_idx" ON "tasks" USING btree ("shift_id");
  CREATE INDEX "tasks_assigned_to_idx" ON "tasks" USING btree ("assigned_to_id");
  CREATE INDEX "tasks_completed_by_idx" ON "tasks" USING btree ("completed_by_id");
  CREATE INDEX "tasks_photo_idx" ON "tasks" USING btree ("photo_id");
  CREATE INDEX "tasks_updated_at_idx" ON "tasks" USING btree ("updated_at");
  CREATE INDEX "tasks_created_at_idx" ON "tasks" USING btree ("created_at");
  CREATE INDEX "checklists_items_order_idx" ON "checklists_items" USING btree ("_order");
  CREATE INDEX "checklists_items_parent_id_idx" ON "checklists_items" USING btree ("_parent_id");
  CREATE INDEX "checklists_restaurant_idx" ON "checklists" USING btree ("restaurant_id");
  CREATE INDEX "checklists_department_idx" ON "checklists" USING btree ("department_id");
  CREATE INDEX "checklists_updated_at_idx" ON "checklists" USING btree ("updated_at");
  CREATE INDEX "checklists_created_at_idx" ON "checklists" USING btree ("created_at");
  CREATE INDEX "checklist_completions_items_order_idx" ON "checklist_completions_items" USING btree ("_order");
  CREATE INDEX "checklist_completions_items_parent_id_idx" ON "checklist_completions_items" USING btree ("_parent_id");
  CREATE INDEX "checklist_completions_items_photo_idx" ON "checklist_completions_items" USING btree ("photo_id");
  CREATE INDEX "checklist_completions_checklist_idx" ON "checklist_completions" USING btree ("checklist_id");
  CREATE INDEX "checklist_completions_restaurant_idx" ON "checklist_completions" USING btree ("restaurant_id");
  CREATE INDEX "checklist_completions_shift_idx" ON "checklist_completions" USING btree ("shift_id");
  CREATE INDEX "checklist_completions_completed_by_idx" ON "checklist_completions" USING btree ("completed_by_id");
  CREATE INDEX "checklist_completions_manager_approved_by_idx" ON "checklist_completions" USING btree ("manager_approved_by_id");
  CREATE INDEX "checklist_completions_updated_at_idx" ON "checklist_completions" USING btree ("updated_at");
  CREATE INDEX "checklist_completions_created_at_idx" ON "checklist_completions" USING btree ("created_at");
  CREATE INDEX "announcements_attachments_order_idx" ON "announcements_attachments" USING btree ("_order");
  CREATE INDEX "announcements_attachments_parent_id_idx" ON "announcements_attachments" USING btree ("_parent_id");
  CREATE INDEX "announcements_attachments_file_idx" ON "announcements_attachments" USING btree ("file_id");
  CREATE INDEX "announcements_read_by_order_idx" ON "announcements_read_by" USING btree ("_order");
  CREATE INDEX "announcements_read_by_parent_id_idx" ON "announcements_read_by" USING btree ("_parent_id");
  CREATE INDEX "announcements_read_by_employee_idx" ON "announcements_read_by" USING btree ("employee_id");
  CREATE INDEX "announcements_restaurant_idx" ON "announcements" USING btree ("restaurant_id");
  CREATE INDEX "announcements_author_idx" ON "announcements" USING btree ("author_id");
  CREATE INDEX "announcements_updated_at_idx" ON "announcements" USING btree ("updated_at");
  CREATE INDEX "announcements_created_at_idx" ON "announcements" USING btree ("created_at");
  CREATE INDEX "announcements_rels_order_idx" ON "announcements_rels" USING btree ("order");
  CREATE INDEX "announcements_rels_parent_idx" ON "announcements_rels" USING btree ("parent_id");
  CREATE INDEX "announcements_rels_path_idx" ON "announcements_rels" USING btree ("path");
  CREATE INDEX "announcements_rels_departments_id_idx" ON "announcements_rels" USING btree ("departments_id");
  CREATE INDEX "announcements_rels_positions_id_idx" ON "announcements_rels" USING btree ("positions_id");
  CREATE INDEX "documents_restaurant_idx" ON "documents" USING btree ("restaurant_id");
  CREATE INDEX "documents_file_idx" ON "documents" USING btree ("file_id");
  CREATE INDEX "documents_updated_by_idx" ON "documents" USING btree ("updated_by_id");
  CREATE INDEX "documents_updated_at_idx" ON "documents" USING btree ("updated_at");
  CREATE INDEX "documents_created_at_idx" ON "documents" USING btree ("created_at");
  CREATE INDEX "documents_rels_order_idx" ON "documents_rels" USING btree ("order");
  CREATE INDEX "documents_rels_parent_idx" ON "documents_rels" USING btree ("parent_id");
  CREATE INDEX "documents_rels_path_idx" ON "documents_rels" USING btree ("path");
  CREATE INDEX "documents_rels_departments_id_idx" ON "documents_rels" USING btree ("departments_id");
  CREATE INDEX "incident_reports_photos_order_idx" ON "incident_reports_photos" USING btree ("_order");
  CREATE INDEX "incident_reports_photos_parent_id_idx" ON "incident_reports_photos" USING btree ("_parent_id");
  CREATE INDEX "incident_reports_photos_photo_idx" ON "incident_reports_photos" USING btree ("photo_id");
  CREATE INDEX "incident_reports_restaurant_idx" ON "incident_reports" USING btree ("restaurant_id");
  CREATE INDEX "incident_reports_shift_idx" ON "incident_reports" USING btree ("shift_id");
  CREATE INDEX "incident_reports_reported_by_idx" ON "incident_reports" USING btree ("reported_by_id");
  CREATE INDEX "incident_reports_resolved_by_idx" ON "incident_reports" USING btree ("resolved_by_id");
  CREATE INDEX "incident_reports_updated_at_idx" ON "incident_reports" USING btree ("updated_at");
  CREATE INDEX "incident_reports_created_at_idx" ON "incident_reports" USING btree ("created_at");
  CREATE INDEX "incident_reports_rels_order_idx" ON "incident_reports_rels" USING btree ("order");
  CREATE INDEX "incident_reports_rels_parent_idx" ON "incident_reports_rels" USING btree ("parent_id");
  CREATE INDEX "incident_reports_rels_path_idx" ON "incident_reports_rels" USING btree ("path");
  CREATE INDEX "incident_reports_rels_employees_id_idx" ON "incident_reports_rels" USING btree ("employees_id");
  ALTER TABLE "users" ADD CONSTRAINT "users_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "users" ADD CONSTRAINT "users_restaurant_id_restaurants_id_fk" FOREIGN KEY ("restaurant_id") REFERENCES "public"."restaurants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "users" ADD CONSTRAINT "users_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tenants_fk" FOREIGN KEY ("tenants_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_restaurants_fk" FOREIGN KEY ("restaurants_id") REFERENCES "public"."restaurants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_departments_fk" FOREIGN KEY ("departments_id") REFERENCES "public"."departments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_positions_fk" FOREIGN KEY ("positions_id") REFERENCES "public"."positions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_employees_fk" FOREIGN KEY ("employees_id") REFERENCES "public"."employees"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_courses_fk" FOREIGN KEY ("courses_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_lessons_fk" FOREIGN KEY ("lessons_id") REFERENCES "public"."lessons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_quizzes_fk" FOREIGN KEY ("quizzes_id") REFERENCES "public"."quizzes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_quiz_attempts_fk" FOREIGN KEY ("quiz_attempts_id") REFERENCES "public"."quiz_attempts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_enrollments_fk" FOREIGN KEY ("enrollments_id") REFERENCES "public"."enrollments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_shifts_fk" FOREIGN KEY ("shifts_id") REFERENCES "public"."shifts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_shift_assignments_fk" FOREIGN KEY ("shift_assignments_id") REFERENCES "public"."shift_assignments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tasks_fk" FOREIGN KEY ("tasks_id") REFERENCES "public"."tasks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_checklists_fk" FOREIGN KEY ("checklists_id") REFERENCES "public"."checklists"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_checklist_completions_fk" FOREIGN KEY ("checklist_completions_id") REFERENCES "public"."checklist_completions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_announcements_fk" FOREIGN KEY ("announcements_id") REFERENCES "public"."announcements"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_documents_fk" FOREIGN KEY ("documents_id") REFERENCES "public"."documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_incident_reports_fk" FOREIGN KEY ("incident_reports_id") REFERENCES "public"."incident_reports"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_tenant_idx" ON "users" USING btree ("tenant_id");
  CREATE INDEX "users_restaurant_idx" ON "users" USING btree ("restaurant_id");
  CREATE INDEX "users_avatar_idx" ON "users" USING btree ("avatar_id");
  CREATE INDEX "payload_locked_documents_rels_tenants_id_idx" ON "payload_locked_documents_rels" USING btree ("tenants_id");
  CREATE INDEX "payload_locked_documents_rels_restaurants_id_idx" ON "payload_locked_documents_rels" USING btree ("restaurants_id");
  CREATE INDEX "payload_locked_documents_rels_departments_id_idx" ON "payload_locked_documents_rels" USING btree ("departments_id");
  CREATE INDEX "payload_locked_documents_rels_positions_id_idx" ON "payload_locked_documents_rels" USING btree ("positions_id");
  CREATE INDEX "payload_locked_documents_rels_employees_id_idx" ON "payload_locked_documents_rels" USING btree ("employees_id");
  CREATE INDEX "payload_locked_documents_rels_courses_id_idx" ON "payload_locked_documents_rels" USING btree ("courses_id");
  CREATE INDEX "payload_locked_documents_rels_lessons_id_idx" ON "payload_locked_documents_rels" USING btree ("lessons_id");
  CREATE INDEX "payload_locked_documents_rels_quizzes_id_idx" ON "payload_locked_documents_rels" USING btree ("quizzes_id");
  CREATE INDEX "payload_locked_documents_rels_quiz_attempts_id_idx" ON "payload_locked_documents_rels" USING btree ("quiz_attempts_id");
  CREATE INDEX "payload_locked_documents_rels_enrollments_id_idx" ON "payload_locked_documents_rels" USING btree ("enrollments_id");
  CREATE INDEX "payload_locked_documents_rels_shifts_id_idx" ON "payload_locked_documents_rels" USING btree ("shifts_id");
  CREATE INDEX "payload_locked_documents_rels_shift_assignments_id_idx" ON "payload_locked_documents_rels" USING btree ("shift_assignments_id");
  CREATE INDEX "payload_locked_documents_rels_tasks_id_idx" ON "payload_locked_documents_rels" USING btree ("tasks_id");
  CREATE INDEX "payload_locked_documents_rels_checklists_id_idx" ON "payload_locked_documents_rels" USING btree ("checklists_id");
  CREATE INDEX "payload_locked_documents_rels_checklist_completions_id_idx" ON "payload_locked_documents_rels" USING btree ("checklist_completions_id");
  CREATE INDEX "payload_locked_documents_rels_announcements_id_idx" ON "payload_locked_documents_rels" USING btree ("announcements_id");
  CREATE INDEX "payload_locked_documents_rels_documents_id_idx" ON "payload_locked_documents_rels" USING btree ("documents_id");
  CREATE INDEX "payload_locked_documents_rels_incident_reports_id_idx" ON "payload_locked_documents_rels" USING btree ("incident_reports_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "tenants" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "restaurants_opening_hours" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "restaurants" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "departments" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "positions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "employees_documents" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "employees" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "courses" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "courses_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "lessons_practical_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "lessons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "quizzes_questions_options" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "quizzes_questions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "quizzes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "quiz_attempts_answers" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "quiz_attempts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "enrollments_completed_lessons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "enrollments" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "shifts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "shift_assignments" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "tasks" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "checklists_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "checklists" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "checklist_completions_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "checklist_completions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "announcements_attachments" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "announcements_read_by" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "announcements" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "announcements_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "documents" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "documents_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "incident_reports_photos" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "incident_reports" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "incident_reports_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "tenants" CASCADE;
  DROP TABLE "restaurants_opening_hours" CASCADE;
  DROP TABLE "restaurants" CASCADE;
  DROP TABLE "departments" CASCADE;
  DROP TABLE "positions" CASCADE;
  DROP TABLE "employees_documents" CASCADE;
  DROP TABLE "employees" CASCADE;
  DROP TABLE "courses" CASCADE;
  DROP TABLE "courses_rels" CASCADE;
  DROP TABLE "lessons_practical_items" CASCADE;
  DROP TABLE "lessons" CASCADE;
  DROP TABLE "quizzes_questions_options" CASCADE;
  DROP TABLE "quizzes_questions" CASCADE;
  DROP TABLE "quizzes" CASCADE;
  DROP TABLE "quiz_attempts_answers" CASCADE;
  DROP TABLE "quiz_attempts" CASCADE;
  DROP TABLE "enrollments_completed_lessons" CASCADE;
  DROP TABLE "enrollments" CASCADE;
  DROP TABLE "shifts" CASCADE;
  DROP TABLE "shift_assignments" CASCADE;
  DROP TABLE "tasks" CASCADE;
  DROP TABLE "checklists_items" CASCADE;
  DROP TABLE "checklists" CASCADE;
  DROP TABLE "checklist_completions_items" CASCADE;
  DROP TABLE "checklist_completions" CASCADE;
  DROP TABLE "announcements_attachments" CASCADE;
  DROP TABLE "announcements_read_by" CASCADE;
  DROP TABLE "announcements" CASCADE;
  DROP TABLE "announcements_rels" CASCADE;
  DROP TABLE "documents" CASCADE;
  DROP TABLE "documents_rels" CASCADE;
  DROP TABLE "incident_reports_photos" CASCADE;
  DROP TABLE "incident_reports" CASCADE;
  DROP TABLE "incident_reports_rels" CASCADE;
  ALTER TABLE "users" DROP CONSTRAINT "users_tenant_id_tenants_id_fk";
  
  ALTER TABLE "users" DROP CONSTRAINT "users_restaurant_id_restaurants_id_fk";
  
  ALTER TABLE "users" DROP CONSTRAINT "users_avatar_id_media_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_tenants_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_restaurants_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_departments_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_positions_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_employees_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_courses_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_lessons_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_quizzes_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_quiz_attempts_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_enrollments_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_shifts_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_shift_assignments_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_tasks_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_checklists_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_checklist_completions_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_announcements_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_documents_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_incident_reports_fk";
  
  DROP INDEX "users_tenant_idx";
  DROP INDEX "users_restaurant_idx";
  DROP INDEX "users_avatar_idx";
  DROP INDEX "payload_locked_documents_rels_tenants_id_idx";
  DROP INDEX "payload_locked_documents_rels_restaurants_id_idx";
  DROP INDEX "payload_locked_documents_rels_departments_id_idx";
  DROP INDEX "payload_locked_documents_rels_positions_id_idx";
  DROP INDEX "payload_locked_documents_rels_employees_id_idx";
  DROP INDEX "payload_locked_documents_rels_courses_id_idx";
  DROP INDEX "payload_locked_documents_rels_lessons_id_idx";
  DROP INDEX "payload_locked_documents_rels_quizzes_id_idx";
  DROP INDEX "payload_locked_documents_rels_quiz_attempts_id_idx";
  DROP INDEX "payload_locked_documents_rels_enrollments_id_idx";
  DROP INDEX "payload_locked_documents_rels_shifts_id_idx";
  DROP INDEX "payload_locked_documents_rels_shift_assignments_id_idx";
  DROP INDEX "payload_locked_documents_rels_tasks_id_idx";
  DROP INDEX "payload_locked_documents_rels_checklists_id_idx";
  DROP INDEX "payload_locked_documents_rels_checklist_completions_id_idx";
  DROP INDEX "payload_locked_documents_rels_announcements_id_idx";
  DROP INDEX "payload_locked_documents_rels_documents_id_idx";
  DROP INDEX "payload_locked_documents_rels_incident_reports_id_idx";
  ALTER TABLE "users" ALTER COLUMN "name" DROP NOT NULL;
  ALTER TABLE "users" DROP COLUMN "role";
  ALTER TABLE "users" DROP COLUMN "tenant_id";
  ALTER TABLE "users" DROP COLUMN "restaurant_id";
  ALTER TABLE "users" DROP COLUMN "avatar_id";
  ALTER TABLE "users" DROP COLUMN "phone";
  ALTER TABLE "users" DROP COLUMN "is_active";
  ALTER TABLE "users" DROP COLUMN "last_seen";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "tenants_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "restaurants_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "departments_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "positions_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "employees_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "courses_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "lessons_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "quizzes_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "quiz_attempts_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "enrollments_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "shifts_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "shift_assignments_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "tasks_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "checklists_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "checklist_completions_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "announcements_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "documents_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "incident_reports_id";
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_tenants_plan";
  DROP TYPE "public"."enum_tenants_settings_language";
  DROP TYPE "public"."enum_restaurants_opening_hours_day";
  DROP TYPE "public"."enum_restaurants_type";
  DROP TYPE "public"."enum_departments_icon";
  DROP TYPE "public"."enum_positions_access_level";
  DROP TYPE "public"."enum_employees_documents_type";
  DROP TYPE "public"."enum_employees_status";
  DROP TYPE "public"."enum_employees_employment_type";
  DROP TYPE "public"."enum_employees_salary_type";
  DROP TYPE "public"."enum_courses_status";
  DROP TYPE "public"."enum_courses_category";
  DROP TYPE "public"."enum_lessons_type";
  DROP TYPE "public"."enum_quizzes_questions_type";
  DROP TYPE "public"."enum_quizzes_questions_boolean_answer";
  DROP TYPE "public"."enum_enrollments_status";
  DROP TYPE "public"."enum_shifts_status";
  DROP TYPE "public"."enum_shift_assignments_status";
  DROP TYPE "public"."enum_tasks_category";
  DROP TYPE "public"."enum_tasks_priority";
  DROP TYPE "public"."enum_tasks_status";
  DROP TYPE "public"."enum_checklists_type";
  DROP TYPE "public"."enum_checklists_frequency";
  DROP TYPE "public"."enum_checklist_completions_overall_status";
  DROP TYPE "public"."enum_announcements_priority";
  DROP TYPE "public"."enum_documents_category";
  DROP TYPE "public"."enum_incident_reports_type";
  DROP TYPE "public"."enum_incident_reports_severity";
  DROP TYPE "public"."enum_incident_reports_status";`)
}
