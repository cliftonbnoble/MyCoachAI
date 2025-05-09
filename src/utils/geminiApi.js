    // Example using the SDK (potentially in PortalLayout.jsx or a util file)
    import { GoogleGenerativeAI } from "@google/generative-ai";

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    const genAI = new GoogleGenerativeAI(apiKey);

    // Define the system instruction
    const systemInstruction = {
      role: "system",
      parts: [{text: `You are MyCoach AI, the most useful AI for students who can help with finance issues, career, studying, mental and physical health and information about the school. You are eager to help and love staying engaged.

You are conversing with John Doe (student_id S0001). His detailed information is provided below for your context. Use this information to personalize your responses and provide relevant assistance.

John Doe's Data (student_id: S0001):
Academic: {"student_id":"S0001","program_major":"Computer Science","minor":"Mathematics","degree_type":"BA","academic_level":"undergrad","enrollment_status":"full-time","gpa_cumulative":"2.53","gpa_term":"2.48","credit_hours_earned":31,"credit_hours_attempted":34,"transfer_credits":1,"start_date":"2020-08-15T00:00:00.000Z","expected_graduation_date":"2024-05-15T00:00:00.000Z","graduation_status":"Graduated","advisor_name":"Dr. Smith","department":"Computer Science","school_college":"College of Engineering","degree_progress":"100.00","class_schedule":"MWF 9:00-10:00","attendance_record":86,"exam_scores":71,"assignment_grades":76,"final_grades":"A","course_mode":"Online"}
Career: {"student_id":"S0001","career_goals":"Goal: Become a Software Engineer in Technology.","resume_on_file":"resume_candidate1.pdf","cover_letter_on_file":"coverletter_candidate1.pdf","linkedin_profile":"https://linkedin.com/in/candidate1","job_preferences":"Prefers full-time, remote opportunities.","internship_applications":6,"internship_placements":2,"employer_feedback":"Satisfactory performance","career_advisor_assigned":"Alice Johnson","employment_status":"Employed","industry_of_interest":"Technology","portfolio_link":"https://portfolio.example.com/candidate1","mock_interview_participation":true,"mentorship_participation":false,"reference_contacts":"Reference 1","job_application_history":4,"internship_evaluation":"Meets expectations","career_pathway_mapping":"Pathway mapped to Technology","career_readiness_score":71,"resume_score":61}
Financial: {"student_id":"S0001","tuition_balance":"5100.00","payment_history":"Partial payment","payment_plan_status":"Active","financial_aid_status":"Approved","fafsa_submission_date":"2023-01-10T00:00:00.000Z","fafsa_status":"Complete","scholarship_awards":"500.00","grant_awards":"0.00","loan_type":"Federal","loan_amount":"2050.00","loan_provider":"Bank of America","disbursement_dates":"2023-09-01T00:00:00.000Z","refund_status":"Issued","billing_address":"1001 Main St, New York, NY 10011","financial_aid_advisor":"Alice Johnson","aid_eligibility":false,"total_aid_awarded":"38055.00","remaining_aid":"38050.00","overpayment_flag":false,"cost_of_attendance":"20100.00","in_state_out_of_state_tuition_rate":"In-State","billing_due_dates":"2023-08-15T00:00:00.000Z","outstanding_balance":"1015.00","fees_paid":"205.00","payment_method":"Credit Card","financial_hardship_flag":false,"employer_tuition_reimbursement_participation":false}
Health: {"student_id":"S0001","immunization_records":"immunization_record_candidate1.pdf","health_insurance_provider":"Blue Cross","health_insurance_expiry":"2024-12-31T00:00:00.000Z","disability_accommodations":"None","emergency_medical_conditions":"Asthma","allergies":"None","prescription_medication_on_file":"None","covid_19_vaccination_status":"Fully Vaccinated","fitness_center_access":true,"nutrition_plan":"Standard","primary_care_provider_info":"Dr. John Smith","immunization_compliance_status":"Compliant","mental_health_self_assessments":"Stable","health_flag_eg_asthma_epilepsy":"None","injury_reports":"None","counseling_intake_forms":"counseling_intake_candidate1.pdf","physical_activity_level":"Low","fitness_tracker_integration":false,"weight_bmi_tracking":23,"emotional_wellbeing_score":71,"psychological_evaluation_results":"psych_eval_candidate1.pdf","medical_notes_on_file":"med_notes_candidate1.pdf","hipaa_consent_forms":"hipaa_consent_candidate1.pdf","food_allergies":"None"}
Demographic: {"student_id":"S0001","first_name":"John","last_name":"Doe","preferred_name":"John","gender":"Male","date_of_birth":"1985-01-01T00:00:00.000Z","place_of_birth":"New York, NY","nationality":"American","citizenship":"USA","ethnicity_race":"White","primary_language":"English","secondary_languages":"Spanish","address_current":"100 Broadway, New York, NY 10001","phone_number_mobile":"(212) 555-0101","email_personal":"john.doe@example.com","email_institutional":"jdoe@university.edu","emergency_contact_name":"Mary Doe","emergency_contact_relationship":"Parent","emergency_contact_phone":"(212) 555-0301","marital_status":"Single","residency_status_in_state_out_of_state_intl":"In-State","social_security_number":"123-45-6781","preferred_method_of_contact":"Email","military_status":"None","veteran_status":false,"spoken_languages":"English, Spanish","student_photo":"john_doe.jpg","nickname":"John","drivers_license_number":"D0001"}
General: {"student_id":"S0001","username":"jdoe","enrollment_date":"2022-08-15T00:00:00.000Z","preferred_learning_style":"Visual","chatbot_interactions":5,"login_frequency":10,"student_type_eg_domestic_international":"Domestic","participation_in_student_organizations":"Active in Student Council","club_memberships":"Chess Club","leadership_roles":"President","meal_plan":"Full","commuter_or_resident":"Resident","id_card_status":"Active","learning_accommodations":"Standard","communication_preferences":"Email"}
`}]
    };

    // Choose a model and apply the system instruction
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: systemInstruction,
    });

    export async function fetchGeminiResponse(prompt) {
      if (!apiKey) {
          console.error("Gemini API key not found. Make sure VITE_GEMINI_API_KEY is set in your .env file.");
          return "Error: API key not configured."; // Or throw an error
      }
      try {
          // For simple text generation
          const result = await model.generateContent(prompt);
          const response = await result.response;
          let text = response.text();

          // Replace asterisk bullet points with green checkmark
          text = text.replace(/^\*\s/gm, '✅ '); // Replaces '* ' at the start of lines

          // Replace double asterisk bullet points with gold star
          text = text.replace(/^\*\*\s/gm, '⭐ '); // Replaces '** ' at the start of lines

          return text;

          // --- OR --- If maintaining chat history is important for context:
          // This would require managing chat history state passed to this function
          // const chat = model.startChat({ history: yourChatHistoryArray });
          // const result = await chat.sendMessage(prompt);
          // const response = await result.response;
          // const text = response.text();
          // return text;

      } catch (error) {
          console.error("Error fetching Gemini response:", error);
          return "Sorry, I encountered an error trying to respond."; // Return a user-friendly error
      }
    }