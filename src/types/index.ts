// export interface User { // This is redundant as User is imported from @supabase/supabase-js in context
//     id: string
//     email: string
//     created_at: string
//     updated_at: string
//   }
  
  // Example data type - replace with your actual data model
  export interface DataItem {
    id: number
    name: string
  }
  
  export type SupabaseError = {
    message: string
  }