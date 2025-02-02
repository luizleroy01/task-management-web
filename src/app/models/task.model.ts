export type Task = {
    id?:string;
    name:string;
    description:string;
    date:string;
    status:boolean;
    anexos:string[];
}

export type PageTasks = {
    tasks: Task[];
    totalElements:number;
    totalPages:number;
}