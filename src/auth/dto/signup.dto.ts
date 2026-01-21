import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class SignupDto {
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsNotEmpty({ message: '아이디는 비워둘 수 없습니다.' })
  @MinLength(2, {
    message: '아이디가 너무 짧습니다. 최소 2자 이상이어야 합니다.',
  })
  @MaxLength(20, {
    message: '아이디가 너무 깁니다. 최대 20자 이하여야 합니다.',
  })
  username: string;

  @IsString()
  @IsNotEmpty({ message: '비밀번호는 비워둘 수 없습니다.' })
  @MinLength(8, {
    message: '비밀번호가 너무 짧습니다. 최소 8자 이상이어야 합니다.',
  })
  @MaxLength(20, {
    message: '비밀번호가 너무 깁니다. 최대 20자 이하여야 합니다.',
  })
  password: string;
}
