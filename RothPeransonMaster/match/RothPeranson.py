import pandas as pd
import csv
import sys
import io
if sys.version_info[0] < 3: 
    from StringIO import StringIO
else:
    from io import StringIO
# import traceback

class Student():
# Class representing someone making an application.

    # Commented out sections describe the process loudly
    def __init__(self, name, choices):
        self.name = name
        self.choices = choices[::-1]
        self.current_rank = None
        self.current_place = None

    def find_next_preference(self):
        # print(self.name, self.current_rank)
        return self.choices.pop()

    def find_next(self):
        try:
            program = self.find_next_preference()
        except IndexError:
            self.current_place = None
            # print("{} did not match.".format(self.name))
            return False

        # print(self.name, program.name)

        if program.apply_to(self):
            # print("{} temp matched to {}".format(self.name, program.name))
            self.current_place = program
            return True

        self.find_next()

class Program():
# Class representing some program accepting total_places students

    def __init__(self, name, total_places=1):
        self.name = name
        self.choices = []
        self.current_picks = []
        self.total_places = total_places

    def get_insert_point(self, candidate):
        candidate_rank = self.choices.index(candidate)
        current_ranks = [self.choices.index(c) for c in self.current_picks]

        for i, r in enumerate(current_ranks):
            if candidate_rank < r:
                return i

    def apply_to(self, candidate):
        if candidate in self.choices:
            if len(self.current_picks) < self.total_places:
                self.current_picks.append(candidate)
                self.current_picks = sorted(self.current_picks, key=lambda r: self.choices.index(r))
                candidate.current_place = self
                return True

            if self.get_pick_rank(candidate) < self.get_pick_rank(self.current_picks[-1]):
                insert_point = self.get_insert_point(candidate)
                self.current_picks.insert(insert_point, candidate)
                replaced = self.current_picks.pop()
                candidate.current_place = self
                replaced.find_next()
                return True

        return False

    def get_pick_rank(self, candidate):
        return self.choices.index(candidate)


class MatchController():
# This class manages the processing of rank order lists for Students and Programs
# in addition to controlling the match process and returning the final results.

    def __init__(self, program_data, candidate_data, places_data=None):
        # Takes csv data directories
        program_data_str = StringIO(program_data.decode('utf-8').lower().replace(' ', '').replace('\n','').replace('\t',''))
        candidate_data_str = StringIO(candidate_data.decode('utf-8').lower().replace(' ','').replace('\n','').replace('\t',''))
        # print(program_data.splitlines())
        # print(program_data_str)
        # self.program_data = csv.reader(program_data_str, delimiter=',')

        # for row in reader:
        #     print(row)
        # with open(program_data_str, newline='') as csvfile:
        #     a = csv.DictReader(open(program_data))
        #     for row in a:
        #         print(row)
        # self.candidate_data = csv.reader(candidate_data_str, delimiter=',')
        self.program_data = pd.read_csv(program_data_str)
        self.candidate_data = pd.read_csv(candidate_data_str)
        self.candidate_data = self.candidate_data.drop(self.candidate_data.index[0])
        self.candidate_data = self.candidate_data.drop(self.candidate_data.index[0])
        if places_data:
            places_data_str = StringIO(places_data.decode('utf-8'))
            # self.places_data = csv.reader(places_data_str, delimiter=',')
            self.places_data = pd.read_csv(places_data_str,names=[1,2],index_col=0)

        self.programs = {}
        self.candidates = {}
        # print(type(self.candidate_data))
        # print(self.program_data)
        # print(self.candidate_data)
        # print(self.places_data)
    
    def organize_candidates(self, places_data):
        try:
            for c in self.program_data.columns:
                # print(c)
                # print(self.program_data.columns)
                # print(self.places_data.loc[c].at[2])
                if places_data:
                    self.programs[c] = Program(c, self.places_data.loc[c].at[2])
                else:
                    self.programs[c] = Program(c)

            for c in self.candidate_data.columns:
                choices = self.candidate_data[c].dropna().tolist()
                choice_objects = [self.programs[p] for p in choices]
                self.candidates[c] = Student(c, choice_objects)

            for c in self.program_data.columns:
                choices = self.program_data[c].dropna().tolist()
                choice_objects = [self.candidates[k] for k in choices] #changed c to k
                self.programs[c].choices = choice_objects

            for c in self.candidate_data:
                print(c)
            for c in self.places_data:
                print(c)
        except:
            results_error_message = traceback.format_exc()
            return results_error_message

    def start_match(self):
        try:
            for k, v in self.candidates.items():
                v.find_next()
        except:
            match_error_message = traceback.format_exc()
            return match_error_message

    def print_results(self):
        for c in self.program_data.columns:
            print(self.programs[c].name)
            print(self.programs[c].choices)
            print(self.programs[c].current_picks)
            print(self.programs[c].total_places)
        for c in sorted(self.candidates.keys()):
            print(c)
            try:
                print('    ', self.candidates[c].current_place.name)
            except AttributeError:
                print('    Did not match')

    def results_dict(self):
        try:
            results_dict = {}

            for k, v in self.candidates.items():
                try:
                    results_dict[k] = v.current_place.name
                except AttributeError:
                    results_dict[k] = 'Did not match'

            return results_dict
        except:
            results_error_message = traceback.format_exc()
            return results_error_message

    def get_output_csv(self):
        results = self.results_dict()

        results_df = pd.DataFrame.from_dict(
            results,
            orient='index'
        )

        results_df = results_df.reset_index()
        results_df.columns = ['Candidate', 'Matched Program']

        results_df.to_csv('/results.csv', index=False)

