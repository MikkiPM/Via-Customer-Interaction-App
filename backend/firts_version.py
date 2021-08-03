#  CREATOR: Hashem

DICT_WEIGHT = {'age': 0.1, 'city': 0.2, 'career': 0.35, 'hobbies': 0.35}


def get_specific_grades(age1, age2, city1, city2, career1, career2, hobbies1, hobbies2):
    career_list = []
    hobbies_dict = {}
    if abs(age1 - age2) <= 5:
        age = 1
    else:
        age = 0
    if city1 == city2:
        city_same = 1
    else:
        city_same = 0
    career = 0
    hobbies = 0
    for key in career1:
        if career1[key] == career2[key]:
            career += 1
            if career1[key] is True:
                career_list.append(key)
    career = career/len(career1)
    hobbies_inside_len = 0
    for key in hobbies1:
        temp_hobbies_list = []
        for inside_key in hobbies1[key]:
            if hobbies1[key][inside_key] == hobbies2[key][inside_key]:
                hobbies += 1
                if hobbies1[key][inside_key] is True:
                    temp_hobbies_list.append(inside_key)
        hobbies_dict[key] = temp_hobbies_list
        hobbies_inside_len += len(hobbies1[key])
    hobbies = hobbies/hobbies_inside_len
    return age, city_same, career, hobbies, career_list, hobbies_dict


def formula(age, city_same, career, hobbies):
    return DICT_WEIGHT['city']*city_same + DICT_WEIGHT['career']*career + \
            + DICT_WEIGHT['hobbies']*hobbies + DICT_WEIGHT['age']*age


def same_lang(language1, language2):
    for each in language1:
        if each in language2:
            return True
    return False


def main():
    interaction = []
    name = {'first': 'Ariel', 'last': 'Haser'}
    name = name['first'] + " " + name['last']
    hobbies = {"Sport": {"Running": True, "Soccer": False, "Basketball": True, "Bicycle": True, "Tennis": True},
                 "Music": {"Jewish": True, "Pop": False, "Disco": True, "Jazz": True, "Rock": True},
                 "Economy": {"Health": False, "Behavioral": False, "Family": True, "Environmental": True, "Political": True},
                 "Military Service": {"Combat": True, "Medical": False, "Intelligence": True, "Logistic": True, "Flight": True}}
    career = {"Education": True, "High tech": False, "Banking": True, "Accounting": True, "Electronics": True}
    age = 28
    address = {'street': 'yehuda hanassi', 'city': 'jerusalem'}
    language = ['he', 'en']
    ######################
    name1 = {'first': 'Omeri', 'last': 'Cohavi'}
    name1 = name1['first'] + " " + name1['last']
    hobbies1 = {"Sport": {"Running": False, "Soccer": False, "Basketball": False, "Bicycle": True, "Tennis": True},
               "Music": {"Jewish": True, "Pop": False, "Disco": True, "Jazz": True, "Rock": True},
               "Economy": {"Health": True, "Behavioral": True, "Family": True, "Environmental": True, "Political": True},
               "Military Service": {"Combat": True, "Medical": False, "Intelligence": True, "Logistic": True, "Flight": True}}
    career1 = {"Education": True, "High tech": False, "Banking": True, "Accounting": True, "Electronics": True}
    age1 = 28
    address1 = {'street': 'yehuda hanassi', 'city': 'jerusalem'}
    language1 = ['he', 'fr']
    ########################

    if same_lang(language, language1):
        details = get_specific_grades(age1, age, address1['city'], address['city'], career1, career, hobbies1, hobbies)
        grade = formula(details[0], details[1], details[2], details[3])
        print('MATCH GRADE:' + str(grade))
        if grade > 0.25:
            temp_dict = {}
            temp_dict[name1] = name
            temp_dict['career'] = details[4]
            temp_dict['hobbies'] = details[5]
            interaction.append(temp_dict)
            print(interaction[0])
        else:
            print("NOT ENOUGH MATCHING")
    else:
        print('THERE IS NOT MATCH')


if __name__ == "__main__":
    main()

