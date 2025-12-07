
export class ApiResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
  statusCode: number;

  constructor(statusCode: number, data: T, message: string = "Success") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }
}
