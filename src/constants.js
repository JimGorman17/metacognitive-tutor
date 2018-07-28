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
            title: 'Lessons'
        },
        create_lesson_page: {
            title: 'Create Lesson',
            description: 'Some Description...',
            lesson_saved_success_message: 'Lesson saved'
        },
        grades_page: {
          title: "Grades for '${lessonName}' Lesson",
          grade_for: "Grade for ${studentName}",
          button_title: "Grades",
          column_headers: {
            student: "Student",
            question: "Question",
            answer: "Answer"
          },
          edit_button_text: "Edit",
          remove_button_text: "Remove",
          grade_button_text: "Grade",
          save_button_text: "Save",
          cancel_button_text: "Cancel",
          grade_label_text: "Grade",
          comments_label_text: "Comments",
          grade_saved_message: "Grade Saved",
          grade_removed_message: "Grade Removed",
          card_pyramid: {
            main_ideas: "Main Idea(s)",
            supporting_ideas: "Supporting Idea(s)",
            story_details: "Story Detail(s)",
            unused_items: "Unused Item(s)",
            keys: {
              main_idea: "main_idea",
              supporting_idea: "supporting_idea",
              story_detail: "story_detail"
            }
          }
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
                enunciationVideo1: "Enunciation Video 1",
                enunciationVideo2: "Enunciation Video 2",
                main_idea: "Main Idea",
                supporting_idea: "Supporting Idea",
                story_details: "Story Details",
                story_questions: "Story Questions",
                important_sentences_for_word_scramble: "Important Sentences for Word Scramble",
                see_your_grade: "See Your Grade",
                close_model_label: "Close",
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
          card_pyramid: {
            title: "Card Pyramid"
          },
          story_questions: {
            title: "Story Questions",
            your_answers: "Your Answers"
          },
          word_scramble: {
            title: "Word Scrambles"
          },
          enunciation_video_1: {
            title: "Enunciation Video 1",
            explanation: "OK. Now let's practice speaking some of the words that you read in the story.",
          },
          enunciation_video_2: {
            title: "Enunciation Video 2",
            explanation: "Let's practice some more.",
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