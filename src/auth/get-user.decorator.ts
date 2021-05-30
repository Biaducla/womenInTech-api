import { createParamDecorator, Logger } from '@nestjs/common';
import { Users } from 'src/users/users.entity';

export const GetUser = createParamDecorator(
  (data, req): Users => {
    const user = req.args[0].user;
    return user;
  },
);
