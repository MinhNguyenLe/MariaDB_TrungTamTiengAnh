import { HttpException, HttpStatus } from '@nestjs/common';

const customStatusCode = (statusCode: string, message: string) => {
  throw new HttpException(
    {
      status: HttpStatus[statusCode],
      error: message,
    },
    HttpStatus[statusCode],
  );
};

export default customStatusCode;
