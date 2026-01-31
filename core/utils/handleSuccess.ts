export const success = (data: any, code?: string) => ({
    success: true,
    data: data,
    code: code,
});

export const failure = (data: any, code?: string) => ({
    success: false,
    data: data,
    code: code,
});