// Call this function to open the modal
function openAnswerModal() {
    $('#answerModal').modal('show');
  }
  
  // Call this function to close the modal
  function closeAnswerModal() {
    $('#answerModal').modal('hide');
  }
  
  // Modify your existing replyToQuestion function
  function replyToQuestion(question) {
    openAnswerModal();
  
    // Use a callback function to handle the answer submission
    window.submitAnswer = function () {
      const answer = document.getElementById('answerInput').value;
  
      if (answer) {
        // Call the server to save the answer
        this.chatService.replyToQuestion(question._id, answer).subscribe(() => {
          // After replying, fetch updated questions
          this.fetchQuestions();
          // Close the modal after submitting the answer
          closeAnswerModal();
        });
      }
    };
  }
  