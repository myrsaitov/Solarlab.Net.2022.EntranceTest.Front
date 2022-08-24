export interface IUser  {
  // Никнейм
  userName: string;
        
  // Имя
  firstName: string;

  // Фамилия
  LastName: string;

  // Отчество
  middleName: string;

  // Телефон пользователя
  phoneNumber: string;

  // Телефон пользователя
  address: string;

  // Идентификатор региона
  regionId?: number;

  // Идентификатор пользователя
  userId: string;
}