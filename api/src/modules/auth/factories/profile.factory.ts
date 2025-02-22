import { UserEntity } from 'src/database/entities/user.entity';
import { ProfileDto } from '../dto/profile.dto';

export class ProfileFactory {
  static userToProfileDto(user: UserEntity) {
    const dto = new ProfileDto();

    dto.email = user.email;
    dto.id = user.id;
    dto.username = user.username;

    return dto;
  }
}
