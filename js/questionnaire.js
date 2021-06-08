// questionnaire.js: defined the class for the gameboard

// to add your own questions, define functions below

class Questionnaire {
    constructor(stage) {
        this.stage = stage;

        this.numElements = 0;  // the number of question elements until can move on, set by each question
        this.question = -1;

        this.results = [];

        this.questionDiv = document.getElementById("question");
        this.responseDiv = document.getElementById("response");

        this.previousQuestion = undefined;
        this.currentQuestion = undefined;
        this.nextQuestion = this.introduction;

        this.questionStack = [this.introduction];
    
        // when the next button is pressed, add this question to the stack
        document.getElementById("next-button").onclick = () => {
            this.reset();  // clear the questionnaire display
            this.questionStack.push(this.nextQuestion);  // add the next question to the stack
            this.nextQuestion();  // load the next question
        }

        // when the previous button is pressed, use the previous question from the stack
        document.getElementById("previous-button").onclick = () => {
            // don't run if at the first item
            if (this.questionStack.length == 1) {
                return;
            }

            this.reset();  // clear the questionnaire display
            this.currentQuestion = this.questionStack.pop();  // pop the current question off the stack
            this.previousQuestion = this.questionStack[this.questionStack.length - 1];  // the last item on the popped stack is the previous question
            this.previousQuestion();  // load the previous question
        }
    }

    // resets the questionnaire display
    reset() {
        this.questionDiv.innerHTML = "";
        this.responseDiv.innerHTML = "";
        this.numElements = 0;
    }

    // introduction
    introduction() {
        // set the questions
        this.questionDiv.innerHTML = "Welcome to the questionnaire! You will be asked about your personal background and experience with robots and related tasks.<br><br>Please answer honestly and to the best of your ability, as your responses will be used to draw conclusions from this study.<br><br>To begin, click the \"Next\" button below.";
        
        // set the next question
        this.nextQuestion = this.ageSexGender;

        // set the buttons
        document.getElementById("previous-button").style.display = "none";
        document.getElementById("next-button").style.display = "flex";
    }

    // BACKGROUND

    // question 1: age, sex, gender
    ageSexGender() {
        // set the questions
        this.questionDiv.innerHTML = "Let's begin with some background information.";

        createDropdown("What is your age?", ["18 - 25", "25 - 30", "30 - 35", "35 - 40", "40 - 45", "45+"]);
        createDropdown("What is your sex?", ["Female", "Male", "Other, Unknown, or Prefer Not to Say"]);
        createDropdown("What is your gender identity?", ["Female", "Male", "Other, Non-Binary, or Prefer Not to Say"]);
        
        // set the next question
        this.nextQuestion = this.education;

        // set the buttons
        document.getElementById("previous-button").style.display = "flex";
        document.getElementById("next-button").style.display = "none";
    }

    // question 2: education
    education() {
        // set the questions
        this.questionDiv.innerHTML = "Now let's ask about your education."

        let educationTag = createDropdown("What is your highest level of education?", ["High school or equivalent", "Technical or occupational certificate", "Associate degree", "Bachelor's degree", "Master's degree", "Doctorate (i.e., PhD)", "Professional (i.e., MD, JD, DO)"]);
        let studyTag = createDropdown("What was your primary area of study?", ["(Not Applicable)", "Arts (i.e., Graphic Design, Music, Studio Arts, Theater, Web Design)", "Engineering (i.e., Computer Engineering, Mechanical Engineering)", "Engineering Technical (i.e., Automotive, HVAC, Cybersecurity)", "Humanities (i.e., Business, Education, History, PoliSci, Sociology)", "Mathematics (i.e., Computer Science, Quant Finance, Statistics)", "Physical Sciences (i.e., Biology, Chemistry, Physics)", "Psychology (i.e., Behavioral Science, Cognitive Psychology, Psychology)"])
    
        // set the next question
        this.nextQuestion = this.gaming;

        // set the buttons
        document.getElementById("previous-button").style.display = "flex";
        document.getElementById("next-button").style.display = "none";
    }

    // GAMING

    // question 3: gaming introduction
    gaming() {
        // set the questions
        this.questionDiv.innerHTML = "We suspect that several video game genres use your brain in the same ways that controlling robots do.<br><br>We will now ask you questions about your prior experience with various video game genres."
        // set the next question
        this.nextQuestion = this.gamingFPS;

        // set the buttons
        document.getElementById("previous-button").style.display = "flex";
        document.getElementById("next-button").style.display = "flex";
    }

    // question 4: gaming First Person Shooter
    gamingFPS() {
        // set the questions
        this.questionDiv.innerHTML = "What is your experience with the <b>Action</b> or <b>Shooter</b> genre?";
        let images = createHorizontalImageboard("fps images", ["img/ss_ssb.jpg", "img/ss_halo.png"]);
        let educationTag = createHorizontalSelector("Elements of this genre are near-constant fast-paced action and seamless use of game controllers.<br>Games in this genre include: Call of Duty, Super Smash Bros, Counter Strike, Fortnite, Overwatch, Valorant, Battlefield", ["Unexperienced with this genre", "Played this genre a little<br>(<20 hours)", "Used to play this genre often<br>(>20 hours)", "Play this genre about once a year", "Play this genre every few months", "Play this genre almost every month", "Play this genre almost every week"]);
        
        // set the next question
        this.nextQuestion = this.gamingRTS;

        // set the buttons
        document.getElementById("previous-button").style.display = "flex";
        document.getElementById("next-button").style.display = "none";
    }

    // question 5: gaming Real-Time Strategy
    gamingRTS() {
        // set the questions
        this.questionDiv.innerHTML = "What is your experience with the <b>Real-Time Strategy</b> genre?";
        let images = createHorizontalImageboard("rts images", ["img/ss_aom.jpg", "img/ss_sc.jpg"]);
        let educationTag = createHorizontalSelector("Elements of this genre are micromanagement of economies and units, with focus on real-time tactics.<br>Games in this genre include: Age of Empires, Starcraft, Warcraft, Command & Conquer, Ashes of the Singularity", ["Unexperienced with this genre", "Played this genre a little<br>(<20 hours)", "Used to play this genre often<br>(>20 hours)", "Play this genre about once a year", "Play this genre every few months", "Play this genre almost every month", "Play this genre almost every week"]);
       
        // set the next question
        this.nextQuestion = this.gamingGS;

        // set the buttons
        document.getElementById("previous-button").style.display = "flex";
        document.getElementById("next-button").style.display = "none";
    }

    // question 6: gaming Grand Strategy
    gamingGS() {
        // set the questions
        this.questionDiv.innerHTML = "What is your experience with the <b>Grand Strategy</b> genre?";
        let images = createHorizontalImageboard("gs images", ["img/ss_civ.jpg", "img/ss_eu.jpg"]);
        let educationTag = createHorizontalSelector("Elements of this genre are high level management and strategy, with little focus on tactics or individual units.<br>Games in this genre include: Civilization, Crusador Kings, Europa Universalis, Total War", ["Unexperienced with this genre", "Played this genre a little<br>(<20 hours)", "Used to play this genre often<br>(>20 hours)", "Play this genre about once a year", "Play this genre every few months", "Play this genre almost every month", "Play this genre almost every week"]);
    
        // set the next question
        this.nextQuestion = this.gamingMult;

        // set the buttons
        document.getElementById("previous-button").style.display = "flex";
        document.getElementById("next-button").style.display = "none";
    }

    // question 7: gaming Multiplayer
    gamingMult() {
        // set the questions
        this.questionDiv.innerHTML = "What is your experience with the <b>Multiplayer Real-Time Tactics</b> genre?";
        let images = createHorizontalImageboard("mult images", ["img/ss_wow.jpg", "img/ss_league.jpg"]);
        let educationTag = createHorizontalSelector("Elements of this genre are strategic encounters where teams need to work together and communicate to accomplish goals.<br>Games in this genre include: World of Warcraft, League of Legends, Dota", ["Unexperienced with this genre", "Played this genre a little<br>(<20 hours)", "Used to play this genre often<br>(>20 hours)", "Play this genre about once a year", "Play this genre every few months", "Play this genre almost every month", "Play this genre almost every week"]);
    
        // set the next question
        this.nextQuestion = this.gamingPuzzle;

        // set the buttons
        document.getElementById("previous-button").style.display = "flex";
        document.getElementById("next-button").style.display = "none";
    }

    // question 8: gaming Puzzle
    gamingPuzzle() {
        // set the questions
        this.questionDiv.innerHTML = "What is your experience with the <b>Logic Puzzle</b> genre?";
        let images = createHorizontalImageboard("mult images", ["img/ss_um.png", "img/ss_ff.jpg", "img/ss_mm.png"]);
        let educationTag = createHorizontalSelector("This genre contains puzzles where your actions influence your options later in the puzzle, such as by creating pipelines, moving blocks that affect other blocks, and other similar puzzle aspects.<br>Games in this genre include: Mini Metro, Flow Free, Sudoku, Unblock Me", ["Unexperienced with this genre", "Played this genre a little<br>(<20 hours)", "Used to play this genre often<br>(>20 hours)", "Play this genre about once a year", "Play this genre every few months", "Play this genre almost every month", "Play this genre almost every week"]);

        // set the next question
        this.nextQuestion = this.expIntroduction;

        // set the buttons
        document.getElementById("previous-button").style.display = "flex";
        document.getElementById("next-button").style.display = "none";
    }

    // ROBOT EXPERIENCE
    
    // question 9: experience introduction
    expIntroduction() {
        // set the questions
        this.questionDiv.innerHTML = "Lastly we will ask about your experiences with technology, robotics, and other related topics.";
        // set the next question
        this.nextQuestion = this.expTechnology;

        // set the buttons
        document.getElementById("previous-button").style.display = "flex";
        document.getElementById("next-button").style.display = "flex";
    }

    // question 10: comfort with technology
    expTechnology() {
        // set the questions
        this.questionDiv.innerHTML = "Let's talk about your background with technology.";
        createDropdown("At what age did you start meaningfully using a <b>desktop/laptop computer</b>?", ["0 - 4", "5 - 9", "10 - 14", "15 - 19", "20 - 24", "25 - 29", "30+"]);
        createDropdown("At what age did you start meaningfully using a <b>cell phone</b>?", ["0 - 4", "5 - 9", "10 - 14", "15 - 19", "20 - 24", "25 - 29", "30+"]);
        createHorizontalSelector("How well do you understand how computers work?", ["1: It's magic!", "2: Something something about circuits, memory, and binary", "3: I am interested in tech, but never got into the details", "4: I know what a CPU, a GPU, and RAM are on a basic level", "5: I could figure out how to build a computer", "6: I am proficient at coding", "7: I have taken a course on computer architecture"]);
        
        // set the next question
        this.nextQuestion = this.expRobotics;

        // set the buttons
        document.getElementById("previous-button").style.display = "flex";
        document.getElementById("next-button").style.display = "none";
    }

    // question 11: understanding of autonomy
    expRobotics() {
        // set the questions
        this.questionDiv.innerHTML = "Let's talk about your robotics background. Consider robots as physical, interactive, and intelligent machines, such as robot arms or warehouse robots.";
        createHorizontalSelector("How would you describe your prior robotics experience?", ["1: None, never really used robots", "2: Worked/played with robots a few times, but nothing significant", "3: Familiar with using robots via school/work/hobbies", "4: Been part of a robotics team, non-technical role", "5: Been part of a robotics team, technical role", "6: I could discuss robot systems and autonomy in detail"]);
        createHorizontalSelector("How would you describe your understanding of robot autonomy?", ["1: Robots are magical", "2: I've noticed common trends with how robots work", "3: I understand how a state machine works", "4: I am aware of some basic path planning (i.e., BFS, DFS, A*)", "5: I could implement the mentioned autonomous systems", "6: I could discuss the tradeoffs of different autonomous systems"]);
        
        // set the next question
        this.nextQuestion = this.expPsychology;

        // set the buttons
        document.getElementById("previous-button").style.display = "flex";
        document.getElementById("next-button").style.display = "none";
    }

    // question 12: background in psychology
    expPsychology() {
        // set the questions
        this.questionDiv.innerHTML = "Ok don't feel discouraged about the last section, these are the last questions."

        createHorizontalSelector("How would you describe your experience with psychology or cognitive science?", ["1: Never had an interest", "2: I think it's cool, but not something I have looked into", "3: I am interested and have read some articles about behavioral or cognitive science", "4: I have actively studied this as a hobby", "5: I have taken courses in this topic", "6: I have worked in psychology research"]);
        createHorizontalSelector("How would you describe your experience with logistics or operations?", ["1: Never been in a logistical role", "2: Been involved in community organizations", "3: Helped organize large events", "4: Ran day-of operations for large events", "5: Regularly run large-scale operations", "6: Managed logistics/operations for a company or government organization"]);

        // set the next question
        this.nextQuestion = this.ending;

        // set the buttons
        document.getElementById("previous-button").style.display = "flex";
        document.getElementById("next-button").style.display = "none";
    }


    // question 14: end of questionnaire
    ending() {
        // set the questions
        this.questionDiv.innerHTML = "That's all! Well done and thank you for participating in this questionnaire. You will now be redirected to the experiment portal.";

        // set the buttons
        document.getElementById("previous-button").style.display = "none";
        document.getElementById("next-button").style.display = "none";
    }

}


