export type TodoChangeHandler = (id: number, status: boolean) => void;
export type TodoDeleteHandler = (id: number) => void;
export type TodoAddHandler = (title: string) => void;