
export type NonArrayObject = { [key:string]:any } & { length?: never };

export enum SessionKey {
    IAA = 'IAA',
    PROJECT = 'PROJECT'
}

export enum ActionEnum  {
    Create = 'Create',
    Edit = 'Edit',
    View = 'View',
    Delete = 'Delete',
    Upload = 'Upload'
}

export enum PageEnum  {
    Post = 'Post',
    Category = 'Category',
    IAA = 'IAA',
    Project = 'Project',
    Agency = 'Agency'
}