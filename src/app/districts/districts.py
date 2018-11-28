import csv

with open('distritos.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    line_count = 0
    current_district = ''
    old_district = ''
    distritos = []
    cidades = []
    distrito = {}
    city_count = 0
    for row in csv_reader:
        if line_count == 0:
            print(f'Column names are {", ".join(row)}')
            line_count += 1
        else:
            current_district = row[0]
            if current_district != old_district:
                distrito = {
                    'name' : row[0],
                    'uid': row[1],
                }
                city_count = 0
                distritos.extend([distrito])
            city = {
                'name' : row[2],
                'uid' : row[1] + '-' + str(city_count),
                'district' : row[1]
            }

            cidades.extend([city])
                # criar novo distrito e adiciona lo ao array de distritos
            #adicionar cidade ao array de cidades do distrito
            
            old_district = current_district
            city_count += 1
            line_count += 1
    print (distritos)
    print ('\n\n')
    print (cidades)
    print(f'Processed {line_count} lines.')


