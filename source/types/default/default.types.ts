import Raw from "knex";

export interface Entity {
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export interface BusinessObject {
  id?: string;
}

// export interface PagingParams {
//     page: number | 1;
//     pageSize: number | 10;
//     direction: 'asc' | 'desc';
//     sort: string | 'id';
//     totalCount?: number;
//     data?: any[]
// }
