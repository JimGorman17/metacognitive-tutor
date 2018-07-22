const Labels = {
    app_title: 'Metacognitive Tutor', // Don't forget to change the title in index.html and index.ejs too.
    app_description: 'An app to teach kids metacognitive reading strategies. Written with React.js.',
    home: {
        title: 'Home',
        learn_more: "Learn More",
        image_description: "A teacher teaching students how to read."
    },
    about: {
        title: 'About',
        description: 'An app to teach kids metacognitive reading strategies. Written with React.js.',
    },
    common: {
      items: "Items",
      add_item: "Add Item"
    },
    login: {
        title: "Log in",
        teachers: "Teachers",
        students: "Students",
        log_in_as_a_teacher: 'Login as a Teacher',
        log_in_as_a_student: 'Login as a Student'
    },
    logout: {
        title: 'Logout'
    },
    not_found: {
        title: '404 Page Not Found',
        message: 'Go back to homepage'
    },
    privacy_policy: {
        title: 'Privacy Policy',
        phone_number: '781 205-9546',
        email_address: 'jgorman30@gatech.edu'
    },
    teacher: {
        admin_page: {
            title: 'Lessons',
            description: 'Some Description...'
        },
        create_lesson_page: {
            title: 'Create Lesson',
            description: 'Some Description...',
            lesson_saved_success_message: 'Lesson saved'
        },
        grades_page: {
          title: "Grades"
        },
        lesson_form: {
            manage_lesson: {
                title: "Manage Lesson",
                preview: "Preview",
                edit: "Edit",
                remove: "Remove",
                move_up: "Move Up",
                move_down: "Move Down",
                complete_lesson: "Complete Lesson",
                lesson_author: "Lesson Author",
                book_title: "Book Title",
                book_amazon_url: "Amazon Url",
                the_hook: "The Hook",
                the_two_vocabulary_words_you_tube_video: "The Two Vocabulary Words",
                main_idea: "Main Idea",
                supporting_idea: "Supporting Idea",
                story_details: "Story Details",
                story_questions: "Story Questions",
                important_sentences_for_word_scramble: "Important Sentences for Word Scramble",
                you_tube_video_selection: {
                  column_headers: {
                    title: "Title",
                    description: "Description",
                    image: "Image"
                  },
                  title: "Choose a YouTube Video",
                  select: "Select",
                  preview: "Preview"
                }
            }
        }
    },
    student: {
        main_menu: {
            title: 'Main Menu',
            description: 'Some Description...'
        },
        lesson_page: {
            title: 'Lesson Page',
            description: 'Some Description...',
            answers_saved_success_message: "Answers saved",
        },
        wizard_steps: {
          welcome: {
            title: "Welcome"
          },
          the_hook: {
            title: "The Hook"
          },
          two_vocabulary_words: {
            title: "Two Vocabulary Words"
          },
          please_read_the_book: {
            title: "Please Read the Book"
          },
          important_details_to_review: {
            title: "Important Details to Review"
          },
          story_questions: {
            title: "Story Questions",
            your_answers: "Your Answers"
          },
          congratulations: {
            title: "Congratulations"
          }
        }
    },
    shared: {
        lessons_page: {
            title: "Lessons"
        }
    }
}

const LoginServiceEnum = Object.freeze({ logged_out: 0, google: 'google', facebook: 'facebook' }); // https://stackoverflow.com/a/5040502/109941, 06/27/2018
const LoginTypeEnum = Object.freeze({ logged_out: '', teacher: 'teacher', student: 'student' }); // https://stackoverflow.com/a/5040502/109941, 06/27/2018
const QuestionTypeEnum = Object.freeze({ story_question: 'story_question', card_pyramid: 'card_pyramid', word_scramble: 'word_scramble' }); // https://stackoverflow.com/a/5040502/109941, 06/27/2018

export {
    Labels,
    LoginServiceEnum,
    LoginTypeEnum,
    QuestionTypeEnum
};