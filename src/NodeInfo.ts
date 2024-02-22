export interface NodeInfo {
    id: string;
    type: string;

    props: {
        src?: string;
        name?: string;
        tags?: string[];
        content?: string;
        thumbnail?: string;
        links?: any[];
    }
    children: NodeInfo[];
}
