export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      attendance: {
        Row: {
          break_duration: number | null
          clock_in: string | null
          clock_out: string | null
          created_at: string | null
          date: string
          employee_id: string
          id: string
          notes: string | null
          status: string | null
          total_hours: number | null
        }
        Insert: {
          break_duration?: number | null
          clock_in?: string | null
          clock_out?: string | null
          created_at?: string | null
          date: string
          employee_id: string
          id?: string
          notes?: string | null
          status?: string | null
          total_hours?: number | null
        }
        Update: {
          break_duration?: number | null
          clock_in?: string | null
          clock_out?: string | null
          created_at?: string | null
          date?: string
          employee_id?: string
          id?: string
          notes?: string | null
          status?: string | null
          total_hours?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "attendance_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      certifications: {
        Row: {
          certificate_url: string | null
          created_at: string | null
          employee_id: string
          expiration_date: string | null
          id: string
          issue_date: string | null
          issuing_organization: string | null
          name: string
          status: string | null
        }
        Insert: {
          certificate_url?: string | null
          created_at?: string | null
          employee_id: string
          expiration_date?: string | null
          id?: string
          issue_date?: string | null
          issuing_organization?: string | null
          name: string
          status?: string | null
        }
        Update: {
          certificate_url?: string | null
          created_at?: string | null
          employee_id?: string
          expiration_date?: string | null
          id?: string
          issue_date?: string | null
          issuing_organization?: string | null
          name?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "certifications_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      course_enrollments: {
        Row: {
          completed_at: string | null
          course_id: string
          employee_id: string
          enrolled_at: string | null
          id: string
          progress_percentage: number | null
          status: string | null
        }
        Insert: {
          completed_at?: string | null
          course_id: string
          employee_id: string
          enrolled_at?: string | null
          id?: string
          progress_percentage?: number | null
          status?: string | null
        }
        Update: {
          completed_at?: string | null
          course_id?: string
          employee_id?: string
          enrolled_at?: string | null
          id?: string
          progress_percentage?: number | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "course_enrollments_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_enrollments_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          category: string | null
          content_url: string | null
          created_at: string | null
          description: string | null
          difficulty_level: string | null
          duration_hours: number | null
          id: string
          instructor: string | null
          is_active: boolean | null
          thumbnail_url: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          category?: string | null
          content_url?: string | null
          created_at?: string | null
          description?: string | null
          difficulty_level?: string | null
          duration_hours?: number | null
          id?: string
          instructor?: string | null
          is_active?: boolean | null
          thumbnail_url?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          category?: string | null
          content_url?: string | null
          created_at?: string | null
          description?: string | null
          difficulty_level?: string | null
          duration_hours?: number | null
          id?: string
          instructor?: string | null
          is_active?: boolean | null
          thumbnail_url?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      departments: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          manager_id: string | null
          name: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          manager_id?: string | null
          name: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          manager_id?: string | null
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "departments_manager_id_fkey"
            columns: ["manager_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      employees: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          department: string | null
          email: string
          employee_id: string
          first_name: string
          hire_date: string | null
          id: string
          last_name: string
          location: string | null
          manager_id: string | null
          phone: string | null
          position: string | null
          salary: number | null
          status: Database["public"]["Enums"]["employment_status"] | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          department?: string | null
          email: string
          employee_id: string
          first_name: string
          hire_date?: string | null
          id?: string
          last_name: string
          location?: string | null
          manager_id?: string | null
          phone?: string | null
          position?: string | null
          salary?: number | null
          status?: Database["public"]["Enums"]["employment_status"] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          department?: string | null
          email?: string
          employee_id?: string
          first_name?: string
          hire_date?: string | null
          id?: string
          last_name?: string
          location?: string | null
          manager_id?: string | null
          phone?: string | null
          position?: string | null
          salary?: number | null
          status?: Database["public"]["Enums"]["employment_status"] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employees_manager_id_fkey"
            columns: ["manager_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      job_applications: {
        Row: {
          applicant_email: string
          applicant_name: string
          applicant_phone: string | null
          applied_at: string | null
          cover_letter: string | null
          id: string
          job_posting_id: string
          resume_url: string | null
          status: Database["public"]["Enums"]["application_status"] | null
          updated_at: string | null
        }
        Insert: {
          applicant_email: string
          applicant_name: string
          applicant_phone?: string | null
          applied_at?: string | null
          cover_letter?: string | null
          id?: string
          job_posting_id: string
          resume_url?: string | null
          status?: Database["public"]["Enums"]["application_status"] | null
          updated_at?: string | null
        }
        Update: {
          applicant_email?: string
          applicant_name?: string
          applicant_phone?: string | null
          applied_at?: string | null
          cover_letter?: string | null
          id?: string
          job_posting_id?: string
          resume_url?: string | null
          status?: Database["public"]["Enums"]["application_status"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "job_applications_job_posting_id_fkey"
            columns: ["job_posting_id"]
            isOneToOne: false
            referencedRelation: "job_postings"
            referencedColumns: ["id"]
          },
        ]
      }
      job_postings: {
        Row: {
          applications_count: number | null
          created_at: string | null
          department: string
          description: string | null
          id: string
          job_type: string | null
          location: string | null
          posted_by: string | null
          requirements: string | null
          salary_max: number | null
          salary_min: number | null
          status: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          applications_count?: number | null
          created_at?: string | null
          department: string
          description?: string | null
          id?: string
          job_type?: string | null
          location?: string | null
          posted_by?: string | null
          requirements?: string | null
          salary_max?: number | null
          salary_min?: number | null
          status?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          applications_count?: number | null
          created_at?: string | null
          department?: string
          description?: string | null
          id?: string
          job_type?: string | null
          location?: string | null
          posted_by?: string | null
          requirements?: string | null
          salary_max?: number | null
          salary_min?: number | null
          status?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "job_postings_posted_by_fkey"
            columns: ["posted_by"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      leave_requests: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          created_at: string | null
          days_requested: number
          employee_id: string
          end_date: string
          id: string
          leave_type: Database["public"]["Enums"]["leave_type"]
          reason: string | null
          start_date: string
          status: Database["public"]["Enums"]["leave_status"] | null
          updated_at: string | null
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string | null
          days_requested: number
          employee_id: string
          end_date: string
          id?: string
          leave_type: Database["public"]["Enums"]["leave_type"]
          reason?: string | null
          start_date: string
          status?: Database["public"]["Enums"]["leave_status"] | null
          updated_at?: string | null
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string | null
          days_requested?: number
          employee_id?: string
          end_date?: string
          id?: string
          leave_type?: Database["public"]["Enums"]["leave_type"]
          reason?: string | null
          start_date?: string
          status?: Database["public"]["Enums"]["leave_status"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "leave_requests_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leave_requests_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      payroll: {
        Row: {
          base_salary: number | null
          bonuses: number | null
          created_at: string | null
          deductions: number | null
          employee_id: string
          gross_pay: number | null
          id: string
          net_pay: number | null
          overtime_hours: number | null
          overtime_rate: number | null
          pay_period_end: string
          pay_period_start: string
          processed_at: string | null
          status: string | null
          tax_deductions: number | null
        }
        Insert: {
          base_salary?: number | null
          bonuses?: number | null
          created_at?: string | null
          deductions?: number | null
          employee_id: string
          gross_pay?: number | null
          id?: string
          net_pay?: number | null
          overtime_hours?: number | null
          overtime_rate?: number | null
          pay_period_end: string
          pay_period_start: string
          processed_at?: string | null
          status?: string | null
          tax_deductions?: number | null
        }
        Update: {
          base_salary?: number | null
          bonuses?: number | null
          created_at?: string | null
          deductions?: number | null
          employee_id?: string
          gross_pay?: number | null
          id?: string
          net_pay?: number | null
          overtime_hours?: number | null
          overtime_rate?: number | null
          pay_period_end?: string
          pay_period_start?: string
          processed_at?: string | null
          status?: string | null
          tax_deductions?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "payroll_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      performance_reviews: {
        Row: {
          achievements: string | null
          areas_for_improvement: string | null
          comments: string | null
          created_at: string | null
          employee_id: string
          goals: string | null
          id: string
          overall_rating:
            | Database["public"]["Enums"]["performance_rating"]
            | null
          review_period_end: string
          review_period_start: string
          reviewer_id: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          achievements?: string | null
          areas_for_improvement?: string | null
          comments?: string | null
          created_at?: string | null
          employee_id: string
          goals?: string | null
          id?: string
          overall_rating?:
            | Database["public"]["Enums"]["performance_rating"]
            | null
          review_period_end: string
          review_period_start: string
          reviewer_id: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          achievements?: string | null
          areas_for_improvement?: string | null
          comments?: string | null
          created_at?: string | null
          employee_id?: string
          goals?: string | null
          id?: string
          overall_rating?:
            | Database["public"]["Enums"]["performance_rating"]
            | null
          review_period_end?: string
          review_period_start?: string
          reviewer_id?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "performance_reviews_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "performance_reviews_reviewer_id_fkey"
            columns: ["reviewer_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
          role: Database["public"]["Enums"]["user_role"] | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      application_status:
        | "pending"
        | "under_review"
        | "interviewed"
        | "offered"
        | "hired"
        | "rejected"
      employment_status: "active" | "inactive" | "terminated"
      leave_status: "pending" | "approved" | "rejected" | "cancelled"
      leave_type:
        | "annual"
        | "sick"
        | "personal"
        | "maternity"
        | "paternity"
        | "emergency"
      performance_rating:
        | "excellent"
        | "good"
        | "satisfactory"
        | "needs_improvement"
        | "unsatisfactory"
      user_role: "admin" | "manager" | "employee" | "hr"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      application_status: [
        "pending",
        "under_review",
        "interviewed",
        "offered",
        "hired",
        "rejected",
      ],
      employment_status: ["active", "inactive", "terminated"],
      leave_status: ["pending", "approved", "rejected", "cancelled"],
      leave_type: [
        "annual",
        "sick",
        "personal",
        "maternity",
        "paternity",
        "emergency",
      ],
      performance_rating: [
        "excellent",
        "good",
        "satisfactory",
        "needs_improvement",
        "unsatisfactory",
      ],
      user_role: ["admin", "manager", "employee", "hr"],
    },
  },
} as const
