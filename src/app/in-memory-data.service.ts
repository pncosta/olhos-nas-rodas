import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const events = [
      { id: 11, name: 'Mr. Nice', description: 'A very long and boring descirption', date: '22-12-2017 13:32', location:'Lisboa'},
      { id: 12, name: 'Narco', description: 'Red Brompton with white fork. Fitted with SON hub dynamo, B&M lights, rack, and mudguards. Black standard Brompton saddle with telescopic seat post. 2016 ex demo bike, has "Demo Bike" written on one side instead of the Brompton logo.', location: 'Campo Grande' },
      { id: 13, name: 'Bombasto', description: 'A very long and boring descirption' },
      { id: 14, name: 'Celeritas',date: '22-12-2017' },
      { id: 15, name: 'Magneta' },
      { id: 16, name: 'RubberMan', description: 'A very long and boring descirption', date: '22-12-2017' },
      { id: 17, name: 'Dynama' },
      { id: 18, name: 'Dr IQ' },
      { id: 19, name: 'Magma', description: 'A very long and boring descirption', date: '22-12-2017' },
      { id: 20, name: 'Tornado' }
    ];
    return {events};
  }
}