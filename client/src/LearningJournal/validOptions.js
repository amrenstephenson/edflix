const validCourses = [{label: 'Accounting'}, {label: 'Accounting and Finance'}, {label: 'Accounting with Industrial/Professional Experience'}, {label: 'Actuarial Science and Mathematics'}, {label: 'Adult Nursing'}, {label: 'Aerospace Engineering'}, {label: 'Aerospace Engineering with Industrial Experience'}, {label: 'Aerospace Engineering with Management'}, {label: 'Aerospace Engineering with an Integrated Foundation Year'}, {label: 'American Studies'}, {label: 'Ancient History'}, {label: 'Ancient History and Archaeology'}, {label: 'Ancient History and History'}, {label: 'Arabic Studies'}, {label: 'Arabic and French'}, {label: 'Arabic and German'}, {label: 'Arabic and Italian'}, {label: 'Arabic and Politics'}, {label: 'Arabic and Portuguese'}, {label: 'Arabic and Russian'}, {label: 'Arabic and Spanish'}, {label: 'Archaeology'}, {label: 'Archaeology and Ancient History'}, {label: 'Archaeology and Anthropology'}, {label: 'Archaeology and History'}, {label: 'Architecture'}, {label: 'Art History and Arabic'}, {label: 'Art History and Chinese'}, {label: 'Art History and English Literature'}, {label: 'Art History and French'}, {label: 'Art History and German'}, {label: 'Art History and History'}, {label: 'Art History and Italian'}, {label: 'Art History and Japanese'}, {label: 'Art History and Portuguese'}, {label: 'Art History and Russian'}, {label: 'Art History and Spanish'}, {label: 'Biochemistry'}, {label: 'Biochemistry with Entrepreneurship'}, {label: 'Biochemistry with Industrial/Professional Experience'}, {label: 'Biochemistry with a Modern Language'}, {label: 'Biology'}, {label: 'Biology with Entrepreneurship'}, {label: 'Biology with Industrial/Professional Experience'}, {label: 'Biology with Science & Society'}, {label: 'Biology with Science and Society with Industrial/Professional Experience'}, {label: 'Biology with a Modern Language'}, {label: 'Biomedical Sciences'}, {label: 'Biomedical Sciences with Entrepreneurship'}, {label: 'Biomedical Sciences with Industrial/Professional Experience'}, {label: 'Biomedical Sciences with a Modern Language'}, {label: 'Biosciences with a Foundation Year'}, {label: 'Biotechnology'}, {label: 'Biotechnology with Entrepreneurship'}, {label: 'Biotechnology with Industrial/Professional Experience'}, {label: 'Business Accounting with Industrial/Professional Experience'}, {label: 'Chemical Engineering'}, {label: 'Chemical Engineering with Energy and Environment'}, {label: 'Chemical Engineering with Industrial Experience'}, {label: 'Chemical Engineering with Study in Europe'}, {label: 'Chemical Engineering with an Integrated Foundation Year'}, {label: 'Chemistry'}, {label: 'Chemistry with Industrial Experience'}, {label: 'Chemistry with International Study'}, {label: 'Chemistry with Medicinal Chemistry'}, {label: 'Chemistry with an Integrated Foundation Year'}, {label: "Children's Nursing"}, {label: 'Chinese Studies'}, {label: 'Chinese and English Language'}, {label: 'Chinese and French'}, {label: 'Chinese and German'}, {label: 'Chinese and Japanese'}, {label: 'Chinese and Linguistics'}, {label: 'Chinese and Politics'}, {label: 'Chinese and Russian'}, {label: 'Chinese and Spanish'}, {label: 'Civil Engineering'}, {label: 'Civil Engineering (Enterprise)'}, {label: 'Civil Engineering with Industrial Experience'}, {label: 'Civil Engineering with an Integrated Foundation Year'}, {label: 'Civil and Structural Engineering'}, {label: 'Classical Studies'}, {label: 'Classics'}, {label: 'Cognitive Neuroscience and Psychology'}, {label: 'Comparative Religion and Social Anthropology'}, {label: 'Computer Science'}, {label: 'Computer Science and Mathematics'}, {label: 'Computer Science and Mathematics with Industrial Experience'}, {label: 'Computer Science with Industrial Experience'}, {label: 'Computer Science with an Integrated Foundation Year'}, {label: 'Criminology'}, {label: 'Criminology and Data Analytics'}, {label: 'Criminology with International Study'}, {label: 'Dental Hygiene and Therapy'}, {label: 'Dentistry (first-year entry)'}, {label: 'Dentistry (pre-dental entry)'}, {label: 'Development Studies'}, {label: 'Development Studies and Data Analytics'}, {label: 'Drama'}, {label: 'Drama and English Literature'}, {label: 'Drama and Film Studies'}, {label: 'Drama and Music'}, {label: 'Earth and Planetary Sciences'}, {label: 'Earth and Planetary Sciences with Industrial Experience'}, {label: 'Earth and Planetary Sciences with International Study'}, {label: 'Earth and Planetary Sciences with a Research Placement'}, {label: 'Earth and Planetary Sciences with an Integrated Foundation Year'}, {label: 'East Asian Studies'}, {label: 'East Asian Studies with International Study'}, {label: 'Economics'}, {label: 'Economics and Data Analytics'}, {label: 'Economics and Finance'}, {label: 'Economics and Philosophy'}, {label: 'Economics and Politics'}, {label: 'Economics and Sociology'}, {label: 'Education'}, {label: 'Educational Psychology'}, {label: 'Egyptology'}, {label: 'Electrical and Electronic Engineering'}, {label: 'Electrical and Electronic Engineering with Industrial Experience'}, {label: 'Electrical, Electronic & Mechatronic Engineering with an Integrated Foundation Year'}, {label: 'Electronic Engineering'}, {label: 'Electronic Engineering with Industrial Experience'}, {label: 'English Language'}, {label: 'English Language and Arabic'}, {label: 'English Language and Chinese'}, {label: 'English Language and English Literature'}, {label: 'English Language and French'}, {label: 'English Language and German'}, {label: 'English Language and Japanese'}, {label: 'English Language and Russian'}, {label: 'English Language and Spanish'}, {label: 'English Literature'}, {label: 'English Literature and American Studies'}, {label: 'English Literature and Drama'}, {label: 'English Literature and French'}, {label: 'English Literature and German'}, {label: 'English Literature and History'}, {label: 'English Literature and Italian'}, {label: 'English Literature and Latin'}, {label: 'English Literature and Spanish'}, {label: 'English Literature with Creative Writing'}, {label: 'Environmental Management'}, {label: 'Environmental Management with Professional Placement'}, {label: 'Environmental Science'}, {label: 'Environmental Science with Industrial Experience'}, {label: 'Environmental Science with International Study'}, {label: 'Environmental Science with a Research Placement'}, {label: 'Environmental Science with an Integrated Foundation Year'}, {label: 'Fashion Buying and Merchandising'}, {label: 'Fashion Management'}, {label: 'Fashion Marketing'}, {label: 'Fashion Technology'}, {label: 'Film Studies and Arabic'}, {label: 'Film Studies and Archaeology'}, {label: 'Film Studies and Chinese'}, {label: 'Film Studies and East Asian Studies'}, {label: 'Film Studies and English Language'}, {label: 'Film Studies and English Literature'}, {label: 'Film Studies and French'}, {label: 'Film Studies and German'}, {label: 'Film Studies and History'}, {label: 'Film Studies and History of Art'}, {label: 'Film Studies and Italian'}, {label: 'Film Studies and Japanese'}, {label: 'Film Studies and Linguistics'}, {label: 'Film Studies and Middle Eastern Studies'}, {label: 'Film Studies and Music'}, {label: 'Film Studies and Portuguese'}, {label: 'Film Studies and Russian'}, {label: 'Film Studies and Spanish'}, {label: 'Finance'}, {label: 'French Studies'}, {label: 'French and Chinese'}, {label: 'French and English Language'}, {label: 'French and German'}, {label: 'French and History'}, {label: 'French and Italian'}, {label: 'French and Japanese'}, {label: 'French and Politics'}, {label: 'French and Portuguese'}, {label: 'French and Russian'}, {label: 'French and Spanish'}, {label: 'Genetics'}, {label: 'Genetics with Entrepreneurship'}, {label: 'Genetics with Industrial/Professional Experience'}, {label: 'Genetics with a Modern Language'}, {label: 'Geography'}, {label: 'Geography with International Study'}, {label: 'Geography with Professional Placement'}, {label: 'German Studies'}, {label: 'German and Chinese'}, {label: 'German and English Language'}, {label: 'German and French'}, {label: 'German and History'}, {label: 'German and Italian'}, {label: 'German and Japanese'}, {label: 'German and Politics'}, {label: 'German and Portuguese'}, {label: 'German and Russian'}, {label: 'German and Spanish'}, {label: 'Global Development'}, {label: 'Global Health (intercalated)'}, {label: 'Global Social Challenges'}, {label: 'Healthcare Science (Audiology)'}, {label: 'History'}, {label: 'History and American Studies'}, {label: 'History and Arabic'}, {label: 'History and Art History'}, {label: 'History and French'}, {label: 'History and German'}, {label: 'History and Italian'}, {label: 'History and Portuguese'}, {label: 'History and Russian'}, {label: 'History and Sociology'}, {label: 'History and Spanish'}, {label: 'History of Art'}, {label: 'Immunology'}, {label: 'Immunology with Entrepreneurship'}, {label: 'Immunology with Industrial/Professional Experience'}, {label: 'Immunology with a Modern Language'}, {label: 'Information Technology Management for Business'}, {label: 'Information Technology Management for Business with Industrial Experience'}, {label: 'International Business, Finance and Economics'}, {label: 'International Business, Finance and Economics with Industrial/Professional Experience'}, {label: 'International Disaster Management & Humanitarian Response'}, {label: 'International Disaster Management and Humanitarian Response and Arabic'}, {label: 'International Disaster Management and Humanitarian Response and Chinese'}, {label: 'International Disaster Management and Humanitarian Response and French'}, {label: 'International Disaster Management and Humanitarian Response and Spanish'}, {label: 'International Management'}, {label: 'Italian Studies'}, {label: 'Italian and French'}, {label: 'Italian and German'}, {label: 'Italian and History'}, {label: 'Italian and Latin'}, {label: 'Italian and Politics'}, {label: 'Italian and Spanish'}, {label: 'Japanese Studies'}, {label: 'Japanese and English Language'}, {label: 'Japanese and French'}, {label: 'Japanese and German'}, {label: 'Japanese and Linguistics'}, {label: 'Japanese and Politics'}, {label: 'Japanese and Russian'}, {label: 'Japanese and Spanish'}, {label: 'Latin and English Literature'}, {label: 'Latin and French'}, {label: 'Latin and Italian'}, {label: 'Latin and Linguistics'}, {label: 'Latin and Spanish'}, {label: 'Law'}, {label: 'Law with Criminology'}, {label: 'Law with International Study'}, {label: 'Law with Politics'}, {label: 'Liberal Arts'}, {label: 'Liberal Arts with International Study'}, {label: 'Life Sciences'}, {label: 'Life Sciences with Entrepreneurship'}, {label: 'Life Sciences with Industrial/Professional Experience'}, {label: 'Life Sciences with a Modern Language'}, {label: 'Linguistics'}, {label: 'Linguistics and Arabic'}, {label: 'Linguistics and Chinese'}, {label: 'Linguistics and French'}, {label: 'Linguistics and German'}, {label: 'Linguistics and Italian'}, {label: 'Linguistics and Japanese'}, {label: 'Linguistics and Latin'}, {label: 'Linguistics and Portuguese'}, {label: 'Linguistics and Russian'}, {label: 'Linguistics and Social Anthropology'}, {label: 'Linguistics and Sociology'}, {label: 'Linguistics and Spanish'}, {label: 'Management'}, {label: 'Management (Accounting & Finance) with Industrial/Professional Experience'}, {label: 'Management (Accounting and Finance)'}, {label: 'Management (Human Resources)'}, {label: 'Management (Human Resources) with Industrial/Professional Experience'}, {label: 'Management (Innovation, Strategy and Entrepreneurship)'}, {label: 'Management (Innovation, Strategy and Entrepreneurship) with Industrial / Professional Experience'}, {label: 'Management (International Business Economics)'}, {label: 'Management (International Business Economics) with Industrial/Professional Experience'}, {label: 'Management (Marketing)'}, {label: 'Management (Marketing) with Industrial/Professional Experience'}, {label: 'Management with Industrial/Professional Experience'}, {label: 'Master of Planning with Real Estate'}, {label: 'Materials Science and Engineering'}, {label: 'Materials Science and Engineering with Biomaterials'}, {label: 'Materials Science and Engineering with Corrosion'}, {label: 'Materials Science and Engineering with Metallurgy'}, {label: 'Materials Science and Engineering with Nanomaterials'}, {label: 'Materials Science and Engineering with Polymers'}, {label: 'Materials Science and Engineering with Textiles Technology'}, {label: 'Materials Science with an Integrated Foundation Year'}, {label: 'Mathematics'}, {label: 'Mathematics and Philosophy'}, {label: 'Mathematics and Physics'}, {label: 'Mathematics and Statistics'}, {label: 'Mathematics with Finance'}, {label: 'Mathematics with Financial Mathematics'}, {label: 'Mathematics with Placement Year'}, {label: 'Mathematics with an Integrated Foundation Year'}, {label: 'Mechanical Engineering'}, {label: 'Mechanical Engineering with Industrial Experience'}, {label: 'Mechanical Engineering with Management'}, {label: 'Mechanical Engineering with an Integrated Foundation Year'}, {label: 'Mechatronic Engineering'}, {label: 'Mechatronic Engineering with Industrial Experience'}, {label: 'Medical Biochemistry'}, {label: 'Medical Biochemistry with Industrial/Professional Experience'}, {label: 'Medical Physiology'}, {label: 'Medical Physiology with Entrepreneurship'}, {label: 'Medical Physiology with Industrial/Professional Experience'}, {label: 'Medical Physiology with a Modern Language'}, {label: 'Medicine'}, {label: 'Medicine (6 years including foundation year)'}, {label: 'Mental Health Nursing'}, {label: 'Microbiology'}, {label: 'Microbiology with Entrepreneurship'}, {label: 'Microbiology with Industrial/Professional Experience'}, {label: 'Microbiology with a Modern Language'}, {label: 'Middle Eastern Studies'}, {label: 'Midwifery'}, {label: 'Modern History and Politics'}, {label: 'Modern History with Economics'}, {label: 'Modern Language and Business & Management (Arabic)'}, {label: 'Modern Language and Business & Management (Chinese)'}, {label: 'Modern Language and Business & Management (French)'}, {label: 'Modern Language and Business & Management (German)'}, {label: 'Modern Language and Business & Management (Italian)'}, {label: 'Modern Language and Business & Management (Japanese)'}, {label: 'Modern Language and Business & Management (Portuguese)'}, {label: 'Modern Language and Business & Management (Russian)'}, {label: 'Modern Language and Business & Management (Spanish)'}, {label: 'Molecular Biology'}, {label: 'Molecular Biology with Entrepreneurship'}, {label: 'Molecular Biology with Industrial/Professional Experience'}, {label: 'Molecular Biology with a Modern Language'}, {label: 'Music'}, {label: 'Music and Drama'}, {label: 'Neuroscience'}, {label: 'Neuroscience with Entrepreneurship'}, {label: 'Neuroscience with Industrial/Professional Experience'}, {label: 'Neuroscience with a Modern Language'}, {label: 'Nursing (Adult)'}, {label: "Nursing (Children's)"}, {label: 'Nursing (Mental Health)'}, {label: 'Optometry'}, {label: 'Pharmacology'}, {label: 'Pharmacology with Entrepreneurship'}, {label: 'Pharmacology with Industrial/Professional Experience'}, {label: 'Pharmacology with a Modern Language'}, {label: 'Pharmacy'}, {label: 'Pharmacy with a Foundation Year'}, {label: 'Philosophy'}, {label: 'Philosophy and Criminology'}, {label: 'Philosophy and Data Analytics'}, {label: 'Philosophy and Politics'}, {label: 'Philosophy and Religion'}, {label: 'Physics'}, {label: 'Physics with Astrophysics'}, {label: 'Physics with Study in Europe'}, {label: 'Physics with Theoretical Physics'}, {label: 'Physics with an Integrated Foundation Year'}, {label: 'Planning'}, {label: 'Planning and Real Estate'}, {label: 'Planning and Real Estate with Professional Placement'}, {label: 'Planning with Professional Placement'}, {label: 'Politics and Arabic'}, {label: 'Politics and Chinese'}, {label: 'Politics and Criminology'}, {label: 'Politics and Data Analytics'}, {label: 'Politics and French'}, {label: 'Politics and German'}, {label: 'Politics and International Relations'}, {label: 'Politics and Italian'}, {label: 'Politics and Japanese'}, {label: 'Politics and Modern History'}, {label: 'Politics and Portuguese'}, {label: 'Politics and Russian'}, {label: 'Politics and Social Anthropology'}, {label: 'Politics and Sociology'}, {label: 'Politics and Spanish'}, {label: 'Politics, Philosophy and Economics'}, {label: 'Portuguese and French'}, {label: 'Portuguese and German'}, {label: 'Portuguese and History'}, {label: 'Portuguese and Linguistics'}, {label: 'Portuguese and Politics'}, {label: 'Portuguese and Spanish'}, {label: 'Psychology'}, {label: 'Public Health (Distance/Blended Learning)'}, {label: 'Public Health (on campus)'}, {label: 'Religions, Theology and Ethics'}, {label: 'Russian Studies'}, {label: 'Russian and Chinese'}, {label: 'Russian and English Language'}, {label: 'Russian and French'}, {label: 'Russian and German'}, {label: 'Russian and History'}, {label: 'Russian and Japanese'}, {label: 'Russian and Linguistics'}, {label: 'Russian and Politics'}, {label: 'Russian and Spanish'}, {label: 'Social Anthropology'}, {label: 'Social Anthropology and Criminology'}, {label: 'Social Anthropology and Data Analytics'}, {label: 'Social Anthropology and Linguistics'}, {label: 'Social Anthropology and Philosophy'}, {label: 'Social Anthropology and Sociology'}, {label: 'Sociology'}, {label: 'Sociology and Arabic'}, {label: 'Sociology and Chinese'}, {label: 'Sociology and Criminology'}, {label: 'Sociology and Data Analytics'}, {label: 'Sociology and French'}, {label: 'Sociology and German'}, {label: 'Sociology and History'}, {label: 'Sociology and Italian'}, {label: 'Sociology and Japanese'}, {label: 'Sociology and Linguistics'}, {label: 'Sociology and Philosophy'}, {label: 'Sociology and Portuguese'}, {label: 'Sociology and Russian'}, {label: 'Sociology and Spanish'}, {label: 'Spanish and Chinese'}, {label: 'Spanish and English Language'}, {label: 'Spanish and French'}, {label: 'Spanish and German'}, {label: 'Spanish and History'}, {label: 'Spanish and Italian'}, {label: 'Spanish and Japanese'}, {label: 'Spanish and Latin'}, {label: 'Spanish and Linguistics'}, {label: 'Spanish and Politics'}, {label: 'Spanish and Portuguese'}, {label: 'Spanish and Russian'}, {label: 'Spanish, Portuguese and Latin American Studies'}, {label: 'Speech and Language Therapy'}, {label: 'Zoology'}, {label: 'Zoology with Entrepreneurship'}, {label: 'Zoology with Industrial/Professional Experience'}, {label: 'Zoology with a Modern Language'}];

const validLevelsOfStudy = [
  'High School', 'Undergraduate - Year 1', 'Undergraduate - Year 2', 'Undergraduate - Year 3', 'Research', 'Other',
];

export { validCourses, validLevelsOfStudy };
