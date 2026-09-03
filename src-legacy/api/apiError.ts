import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
	return typeof error === 'object' && error != null && 'status' in error;
}

export function isErrorWithMessage(data: unknown): data is { message: string } {
	return typeof data === 'object' && data != null && 'message' in data && typeof data.message === 'string';
}

export function getErrorMessage(error: unknown): string {
	if (isFetchBaseQueryError(error) && isErrorWithMessage(error.data)) {
		return error.data.message;
	}
	if ( isErrorWithMessage(error)) {
		return error.message;
	}
	return 'Что-то пошло не так';
}