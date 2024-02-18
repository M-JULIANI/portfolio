export interface NodeInfo {
    id: string;
    name: string;
    type: string;
    props?: {
        name?: string;
        tags?: string[];
        content?: string;
        thumbnail?: string;
    }
    children: NodeInfo[];
}
