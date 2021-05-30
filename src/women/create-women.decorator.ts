import { createParamDecorator } from '@nestjs/common';
import { Women } from './women.entity';

export const CreateWomen = createParamDecorator(
  (data, req): Women => {
    const user = req.args[0].user;
    return user;
  },
);
