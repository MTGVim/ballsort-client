export interface UserDto {
  userId: string;
  firstName: string;
  lastName: string;
  username: string;
}

export interface ErrorDto extends CommonResponseDto {
  result: number;
  message: string;
}

export interface CommonResponseDto {
  result: number;
  message?: string;
}
