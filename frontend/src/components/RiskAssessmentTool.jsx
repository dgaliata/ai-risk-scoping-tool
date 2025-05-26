import React, { useState, useEffect } from 'react';

const RiskAssessmentTool = () => {
  const [scopes, setScopes] = useState([]);
  const [disciplines, setDisciplines] = useState([]);
  const [selectedScope, setSelectedScope] = useState(null);
  const [selectedDiscipline, setSelectedDiscipline] = useState(null);
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_BASE = 'http://localhost:8000'; // Change this to your deployed backend URL

  // Fetch scopes and disciplines on component mount
  useEffect(() => {
    fetch(`${API_BASE}/scopes`)
      .then(res => res.json())
      .then(data => setScopes(data))
      .catch(err => console.error('Error fetching scopes:', err));

    fetch(`${API_BASE}/disciplines`)
      .then(res => res.json())
      .then(data => setDisciplines(data))
      .catch(err => console.error('Error fetching disciplines:', err));
  }, []);

  // Fetch recommendation when both scope and discipline are selected
  useEffect(() => {
    if (selectedScope && selectedDiscipline) {
      setLoading(true);
      fetch(`${API_BASE}/recommendations/${selectedScope}/${selectedDiscipline}`)
        .then(res => res.json())
        .then(data => {
          setRecommendation(data);
          setLoading(false);
        })
        .catch(err => {
          console.error('Error fetching recommendation:', err);
          setLoading(false);
        });
    }
  }, [selectedScope, selectedDiscipline]);

  const handleScopeSelect = (scopeId) => {
    setSelectedScope(scopeId);
    setRecommendation(null);
  };

  const handleDisciplineSelect = (disciplineId) => {
    setSelectedDiscipline(disciplineId);
  };

  const getScopeById = (id) => scopes.find(s => s.id === id);
  const getDisciplineById = (id) => disciplines.find(d => d.id === id);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-700 shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white">AI Security Risk Assessment Tool</h1>
          <p className="text-blue-100 mt-2">Based on the AWS Generative AI Security Scoping Matrix</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          
          {/* Introduction */}
          {!selectedScope && (
            <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6 mb-8">
              <h2 className="text-xl font-medium text-gray-900 mb-4">Welcome to the AI Security Assessment Tool</h2>
              <p className="mb-4">This tool helps you identify security considerations for your generative AI implementation based on the AWS Generative AI Security Scoping Matrix.</p>
              <p className="mb-4">To get started, select your AI implementation scope below.</p>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-md font-medium text-blue-800">How to use this tool:</h3>
                <ol className="mt-2 list-decimal pl-5 text-sm text-blue-800 space-y-1">
                  <li>Select your AI implementation scope (1-5)</li>
                  <li>Choose a security discipline to explore</li>
                  <li>Review the specific recommendations</li>
                  <li>Repeat for each security discipline that applies to your use case</li>
                </ol>
              </div>
            </div>
          )}

          {/* Step 1: Select AI Implementation Scope */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Step 1: Select Your AI Implementation Scope</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {scopes.map((scope) => (
                <div 
                  key={scope.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedScope === scope.id 
                      ? 'bg-blue-50 border-blue-500 shadow-md ring-2 ring-blue-200' 
                      : 'bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                  }`}
                  onClick={() => handleScopeSelect(scope.id)}
                >
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-800 mr-2 text-sm font-bold">
                      {scope.id}
                    </span>
                    {scope.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">{scope.description}</p>
                  <div className="pt-3 border-t border-gray-100">
                    <p className="text-xs italic text-gray-500"><strong>Example:</strong> {scope.example}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Step 2: Select Security Discipline */}
          {selectedScope && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Step 2: Explore Security Disciplines for {getScopeById(selectedScope)?.name}
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {disciplines.map((discipline) => (
                  <div 
                    key={discipline.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      selectedDiscipline === discipline.id 
                        ? 'bg-green-50 border-green-500 shadow-md ring-2 ring-green-200' 
                        : 'bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                    }`}
                    onClick={() => handleDisciplineSelect(discipline.id)}
                  >
                    <h3 className="text-lg font-medium text-gray-900 mb-2">{discipline.name}</h3>
                    <p className="text-sm text-gray-600">{discipline.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Show Recommendations */}
          {selectedScope && selectedDiscipline && (
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 bg-gradient-to-r from-blue-50 to-green-50">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Security Recommendations
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  {getDisciplineById(selectedDiscipline)?.name} recommendations for {getScopeById(selectedScope)?.name}
                </p>
              </div>
              
              <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
                {loading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <span className="ml-2 text-gray-600">Loading recommendations...</span>
                  </div>
                ) : recommendation ? (
                  <>
                    <div className="mb-6">
                      <h4 className="font-medium text-gray-900 mb-3">Specific Recommendations:</h4>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-gray-700 leading-relaxed">{recommendation.recommendation}</p>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-100 pt-6">
                      <h4 className="font-medium text-gray-900 mb-3">Implementation Checklist:</h4>
                      <div className="space-y-2">
                        {getImplementationSteps(selectedDiscipline, selectedScope).map((step, index) => (
                          <div key={index} className="flex items-start">
                            <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                              <span className="text-xs font-bold text-blue-800">{index + 1}</span>
                            </div>
                            <p className="ml-3 text-sm text-gray-600">{step}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          )}

          {/* Reset Button */}
          {(selectedScope || selectedDiscipline) && (
            <div className="mt-8 text-center">
              <button
                onClick={() => {
                  setSelectedScope(null);
                  setSelectedDiscipline(null);
                  setRecommendation(null);
                }}
                className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Start New Assessment
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );

  // Helper function to provide implementation steps based on discipline and scope
  function getImplementationSteps(disciplineId, scopeId) {
    const steps = {
      governance: {
        1: [
          "Review and document terms of service for each AI tool",
          "Create acceptable use policy for generative AI tools",
          "Implement training for employees on AI data handling",
          "Set up monitoring for policy compliance"
        ],
        2: [
          "Review enterprise agreements and data handling practices",
          "Document service provider's compliance posture",
          "Create policies for acceptable data classifications",
          "Monitor for changes in licensing terms"
        ],
        3: [
          "Establish data governance for model inputs and outputs",
          "Implement logging for all model interactions",
          "Define acceptable use policies for your application",
          "Create model selection and approval process"
        ],
        4: [
          "Classify model according to fine-tuning data sensitivity",
          "Implement data governance for training datasets",
          "Document data lineage and model versioning",
          "Create model update and rollback procedures"
        ],
        5: [
          "Develop comprehensive model governance program",
          "Implement data lineage tracking for all training data",
          "Create rigorous testing and validation procedures",
          "Establish model lifecycle management processes"
        ]
      },
      legal: {
        1: [
          "Review provider terms of service and privacy policies",
          "Assess data exposure risks in prompts",
          "Create legal guidelines for AI tool usage",
          "Monitor for terms of service changes"
        ],
        2: [
          "Review enterprise agreements and data processing terms",
          "Understand data usage for model training",
          "Negotiate data residency requirements",
          "Document opt-out procedures for data usage"
        ],
        3: [
          "Review service and model provider legal terms",
          "Assess indemnification policies for copyright",
          "Create feedback mechanisms protecting sensitive data",
          "Monitor regulatory changes affecting your use case"
        ],
        4: [
          "Address GDPR right to erasure challenges",
          "Document copyright and IP implications",
          "Plan for potential model retraining needs",
          "Create procedures for handling data deletion requests"
        ],
        5: [
          "Develop terms of service for your model",
          "Address IP ownership for training data and outputs",
          "Prepare for regulatory classification of your AI system",
          "Create legal documentation for model usage"
        ]
      },
      risk: {
        1: [
          "Assess third-party provider security practices",
          "Train users on AI-specific threats",
          "Monitor for sensitive data disclosure",
          "Implement incident response procedures"
        ],
        2: [
          "Evaluate vendor security practices and SLAs",
          "Protect API keys and access credentials",
          "Assess data reuse risks by providers",
          "Create vendor risk assessment process"
        ],
        3: [
          "Conduct threat modeling for your application",
          "Implement protection against prompt injection",
          "Monitor for unusual model usage patterns",
          "Apply security frameworks like MITRE ATLAS"
        ],
        4: [
          "Assess data leakage risks from fine-tuned models",
          "Implement protection against model poisoning",
          "Carefully select and validate fine-tuning data",
          "Monitor fine-tuning pipeline security"
        ],
        5: [
          "Conduct comprehensive threat modeling",
          "Implement protection against data poisoning",
          "Secure entire model development lifecycle",
          "Create ongoing security monitoring program"
        ]
      },
      controls: {
        1: [
          "Deploy network-based controls (proxies, firewalls, DLP)",
          "Implement host-based security controls",
          "Provide security awareness training",
          "Monitor and log AI tool usage"
        ],
        2: [
          "Configure identity integration with enterprise apps",
          "Review and validate vendor security controls",
          "Implement DLP to prevent sensitive data uploads",
          "Set up role-based access controls"
        ],
        3: [
          "Implement IAM policies for model endpoint access",
          "Build application layer authorization",
          "Apply input validation and output filtering",
          "Deploy guardrails and content filtering"
        ],
        4: [
          "Secure the fine-tuning pipeline",
          "Control access to training data",
          "Encrypt model artifacts",
          "Implement input/output sanitization"
        ],
        5: [
          "Deploy comprehensive model security controls",
          "Implement secure MLOps pipeline",
          "Apply content filtering during training and inference",
          "Conduct regular vulnerability scanning"
        ]
      },
      resilience: {
        1: [
          "Assess provider availability SLAs",
          "Create backup plans for service outages",
          "Monitor usage quotas and billing",
          "Plan for service discontinuation scenarios"
        ],
        2: [
          "Understand vendor availability and resilience",
          "Establish contingency processes",
          "Monitor API usage and costs",
          "Create vendor failure response plans"
        ],
        3: [
          "Configure appropriate timeouts for requests",
          "Implement retry logic and circuit breakers",
          "Consider multi-region deployments",
          "Plan for model endpoint failures"
        ],
        4: [
          "Ensure high availability for inference endpoints",
          "Backup access to training data",
          "Create model rollback mechanisms",
          "Plan for fine-tuning pipeline failures"
        ],
        5: [
          "Build resilient training infrastructure",
          "Implement model checkpointing",
          "Create disaster recovery for model artifacts",
          "Plan for complete infrastructure failures"
        ]
      }
    };

    return steps[disciplineId]?.[scopeId] || [
      "Review applicable requirements for your use case",
      "Implement appropriate controls and procedures",
      "Monitor effectiveness and adjust as needed",
      "Document your implementation for compliance"
    ];
  }
};

export default RiskAssessmentTool;