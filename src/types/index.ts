export interface User {
    id: string
    email: string
    created_at: string
    updated_at: string
  }
  
  // Example data type - replace with your actual data model
  export interface DataItem {
    id: number
    name: string
  }
  
  export type SupabaseError = {
    message: string
  }