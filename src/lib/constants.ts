export const TOAST_MESSAGES = {
    DELETE_SUCCESS: { severity: 'info', summary: 'Info', detail: 'Post Deleted', life: 1500 },
    DELETE_ERROR: (detail: string) => ({ severity: 'error', summary: 'Error', detail, life: 1500 }),
};