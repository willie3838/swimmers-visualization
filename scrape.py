from bs4 import BeautifulSoup
from requests import get
import json

# links to all my friend's profiles
# athleteURL = [
#     # Me
#     "https://www.swimrankings.net/index.php?page=athleteDetail&athleteId=5144926",
#     # Alvin
#     "https://www.swimrankings.net/index.php?page=athleteDetail&athleteId=4455305",
#     # Bryan
#     "https://www.swimrankings.net/index.php?page=athleteDetail&athleteId=4700342",
#     # Jason
#     "https://www.swimrankings.net/index.php?page=athleteDetail&athleteId=4698455",
#     # Colin
#     "https://www.swimrankings.net/index.php?page=athleteDetail&athleteId=4454381",
#     # Ethan
#     "https://www.swimrankings.net/index.php?page=athleteDetail&athleteId=4445992",
#     # Mark
#     "https://www.swimrankings.net/index.php?page=athleteDetail&athleteId=4006496",
#     # Joseph M.
#     "https://www.swimrankings.net/index.php?page=athleteDetail&athleteId=4006156",
#     # Stas
#     "https://www.swimrankings.net/index.php?page=athleteDetail&athleteId=4782953",
#     # Justin
#     "https://www.swimrankings.net/index.php?page=athleteDetail&athleteId=5060037",
#     # Dennis
#     "https://www.swimrankings.net/index.php?page=athleteDetail&athleteId=4787731",
#     # Felipe
#     "https://www.swimrankings.net/index.php?page=athleteDetail&athleteId=4006400",
#     # Anthony
#     "https://www.swimrankings.net/index.php?page=athleteDetail&athleteId=4463689",
#     # Jummy
#     "https://www.swimrankings.net/index.php?page=athleteDetail&athleteId=4460908",
#     # Brandon
#     "https://www.swimrankings.net/index.php?page=athleteDetail&athleteId=4968976",
#     # Michelle Z
#     "https://www.swimrankings.net/index.php?page=athleteDetail&athleteId=4822114",
#     # Michelle W
#     "https://www.swimrankings.net/index.php?page=athleteDetail&athleteId=4787609",
#     # Sophia
#     "https://www.swimrankings.net/index.php?page=athleteDetail&athleteId=5058858",
#     # Tina
#     "https://www.swimrankings.net/index.php?page=athleteDetail&athleteId=4789260",
#     # Ashley L
#     "https://www.swimrankings.net/index.php?page=athleteDetail&athleteId=4960051",
#     # Ashley C
#     "https://www.swimrankings.net/index.php?page=athleteDetail&athleteId=4607299",
#     ]

athleteURL = [
    # Me
    "https://www.swimming.ca/en/swimmer/5144926/",
    # Alvin
    "https://www.swimming.ca/en/swimmer/4455305/",
    # Bryan
    "https://www.swimming.ca/en/swimmer/4700342/",
    # Matteh
    "https://www.swimming.ca/en/swimmer/5061822/",
    # Jason
    "https://www.swimming.ca/en/swimmer/4698455/",
    # Colin
    "https://www.swimming.ca/en/swimmer/4454381/",
    # Ethan
    "https://www.swimming.ca/en/swimmer/4445992/",
    # Mark
    "https://www.swimming.ca/en/swimmer/4006496/",
    # Joseph M.
    "https://www.swimming.ca/en/swimmer/4006156/",
    # Stas
    "https://www.swimming.ca/en/swimmer/4782953/",
    # Justin
    "https://www.swimming.ca/en/swimmer/5060037/",
    # Dennis
    "https://www.swimming.ca/en/swimmer/4787731/",
    # Felipe
    "https://www.swimming.ca/en/swimmer/4006400/",
    # Anthony
    "https://www.swimming.ca/en/swimmer/4463689/",
    # Jummy
    "https://www.swimming.ca/en/swimmer/4460908/",
    # Brandon
    "https://www.swimming.ca/en/swimmer/4968976/",
    # Michelle Z
    "https://www.swimming.ca/en/swimmer/4822114/",
    # Michelle W
    "https://www.swimming.ca/en/swimmer/4787609/",
    # Tina
    "https://www.swimming.ca/en/swimmer/4789260/",
    # Ashley L
    "https://www.swimming.ca/en/swimmer/4960051/",
    # Ashley C
    "https://www.swimming.ca/en/swimmer/4607299/",

]
eventsData = {}
history = {}
id = 0

def eventInformation(athlete):
    athletePage = get(athlete).text
    soup = BeautifulSoup(athletePage, "lxml")

    # extracting first and last name
    firstName = soup.find(id="name").text.split()[-3]
    lastName = soup.find(id="name").text.split()[-4].replace(",", "").lower()
    lastName = "".join(lastName[0].upper() + lastName[1:])
    name = firstName + " " + lastName

    # extracting all the events
    events = soup.find_all("tr", {"class": ["athleteBest0", "athleteBest1"]})

    eventsData[id] = {}
    for event in events:
        eventsData[id] = {}
        eventsData[id]['name'] = name
        eventsData[id]['event_name'] = event.find('a').text
        eventsData[id]['course'] = event.find('td', {"class": "course"}).text
        eventsData[id]['time'] = event.find('td', {"class": "time"}).find('a').text
        eventsData[id]['points'] = event.find('td', {"class": "code"}).text
        eventsData[id]['date'] = event.find('td', {"class": "date"}).text.replace("\xa0", " ")
        eventsData[id]['city'] = event.find('td', {"class": "city"}).find('a').text
        eventsData[id]['meet'] = event.find('td', {"class": "name"}).find('a').text
        id += 1

def historicalEvents(athlete):
    global id


    athletePage = get(athlete).text
    soup = BeautifulSoup(athletePage, "lxml")

    name = soup.find("h1", {"class": "swimmer-info__name"}).find_all("span")
    name = name[0].text + " " + name[1].text

    print(name)

    for i in range(1,20):
        eventURL = athlete+"rankings/?competition=Style-"+str(i)
        eventPage = get(eventURL).text
        soup = BeautifulSoup(eventPage, "lxml")

        eventName = soup.find(id="athlete-table-caption").find("span", {"class":"js-athlete-title"}).text.split()
        eventName = eventName[-2] + " " + eventName[-1]

        courses = soup.find_all("caption")

        if len(courses) == 0:
            continue

        print(eventName)

        events = soup.find_all("tbody")

        history[id] = {}
        history[id]["name"] = name
        history[id]["event"] = eventName
        history[id]["time"] = []
        history[id]["dates"] = []

        if courses[0].text == "Long Course (50m)":
            longCourse = events[0].find_all("tr")
            for event in longCourse:
                time = event.find("td", {"class": "align-center@from-small"}).find("time").text
                date = event.find("td", {"class": "align-right@from-small"}).find("time")['datetime']
                history[id]["time"].append(time)
                history[id]["dates"].append(date)


        if courses[0].text == "Short Course (25m)" or (len(courses) == 2 and courses[1].text == "Short Course (25m)"):
            shortCourse = events[len(courses)-1].find_all("tr")
            for event in shortCourse:
                time = event.find("td", {"class": "align-center@from-small"}).find("time").text
                date = event.find("td", {"class": "align-right@from-small"}).find("time")['datetime']
                history[id]["time"].append(time)
                history[id]["dates"].append(date)

        id = id + 1

    # extracting first and last name
    # firstName = soup.find(id="name").text.split()[-3]
    # lastName = soup.find(id="name").text.split()[-4].replace(",", "").lower()
    # lastName = "".join(lastName[0].upper() + lastName[1:])
    # name = firstName + " " + lastName
    #
    # for i in range(1, 20):
    #     eventURL = athlete+"&styleId="+ str(i)
    #     eventPage = get(eventURL).text
    #     soup = BeautifulSoup(eventPage, "lxml")
    #
    #
    #     # add something here to check if the apge actually exists
    #     eventName = soup.find("table").find("b").text.split("for")[1][1:]
    #     events = soup.find_all("tr", {"class": ["athleteRanking0", "athleteRanking1"]})
    #
    #     history[id]["name"] = name
    #     history[id][eventName] = {}
    #     history[id][eventName]["points"] = []
    #     history[id][eventName]["dates"] = []
    #
    #     for event in events:
    #         points = event.find("td", {"class":"code"}).text
    #         date = event.find("td", {"class": "date"}).text
    #
    #         if(points is not None and date is not None):
    #             history[id][eventName]["points"].append(int(points))
    #             history[id][eventName]["dates"].append(date)



if __name__ == "__main__":


    for athlete in athleteURL:
        historicalEvents(athlete)

    with open("history_data.json", "w") as outfile:
        json.dump(history, outfile, indent=4)
    print("Created historical data")

    # with open("event_data.json", "w") as outfile:
    #     json.dump(eventsData, outfile, indent=4)
    # print("Created events data")