const tabs = [
    {
        id: 0,
        shortName: "advertising",
        shortDescription: "Provide some details about the property to create a compelling advertisement that highlights the best features.",
        name: "Advertising",
        title: 'Create Advertising Message',
        submitMessage: "Create",
        step: 0,
        loading: false,
        currentPrompt: "",
        response: "",
        new: false,
        inputs: {
            "property": {
                "bedrooms": {
                    title: "Bedrooms",
                    placeholder: "",
                    type: "number",
                    size: 100,
                    step: 1,
                    value: 0
                },
                "bathrooms": {
                    title: "Bathrooms",
                    placeholder: "",
                    type: "number",
                    size: 100,
                    step: 1,
                    value: 0
                },
                "sqft": {
                    title: "Sqft",
                    placeholder: "",
                    type: "number",
                    size: 100,
                    step: 50,
                    value: 500
                    
                }},
            "features": {
                "features": {
                    title: "Property features",
                    placeholder: "",
                    name: "features",
                    type: "cluster",
                    size: 100,
                    value: {
                        "utilites": {
                            'central_ac': false,
                            'central_heat': false,
                            'laundry_in-unit': false,
                            'energy_efficient': false,
                            'high_speed_internet': false,
                        },
                        "exterior": {
                            'private_parking': false,
                            'pool': false,
                            'patio': false,
                            'good_schools': false,
                            'views': false,
                            'garden': false,
                            'security': false,
                        },
                        "interior": {
                            'hardwood_floors': false,
                            'garage': false,
                            'freshly_renovated': false,
                            'new_appliances': false,
                            'storage': false,
                            'home_office': false,
                            'fireplace': false,
                            'pets_allowed': false,
                            'game_room': false,
                            'wet_bar': false,
                        }
                    }
                }
            },
            "additional_features": {
                "additional_features": {
                    title: "Additional features",
                    placeholder: "Include any notable features that help your property stand out.",
                    name: "additional_features",
                    type: "textarea",
                    subtext: "List any features tenants will love about your property",
                    size: 100,
                    value: ''
                }
            },
            "terms": {
                "terms": {
                    title: "Lease terms & requirements",
                    placeholder: "Enter details about lease terms like rental price or utilities as well as any tenant requirements such as no pets or a minimum credit score.",
                    name: "terms",
                    type: "textarea",
                    subtext: "Include your desired tenant requirements and terms in your lease",
                    size: 100,
                    value: ''
                }
            }       
        }, 
    },
    {
        id: 1,
        shortName: "messaging",
        shortDescription: "Provide some details about the situation to draft a clear and professional message that effectively communicates your needs.",
        name: "Messages",
        title: 'Write a Email or Text Message',
        submitMessage: "Create",
        step: 0,
        loading: false,
        currentPrompt: "",
        response: "",
        new: false,
        inputs: {
            "message": {
                "recipient": {
                    title: "Who is the message for?",
                    placeholder: "Recipient title or relation to you",
                    type: "shorttext",
                    size: 50,
                    value: ''
                },
                "message": {
                    title: "What is the message about?",
                    placeholder: "Include any details about important issues or concerns, specific requests or instructions, and/or any deadlines or time-sensitive information.",
                    type: "textarea",
                    subtext: "",
                    size: 100,
                    value: ''
                }
            }
        }
    },
    {
        id: 2,
        shortName: "leases",
        shortDescription: "Provide some details of the information and provisions to create a binding lease agreement. Please note it is important to consult with a licensed attorney to ensure the agreement protects your interests.",
        name: "Leases",
        title: 'Write a Lease Agreement',
        submitMessage: "Create",
        step: 0,
        loading: false,
        currentPrompt: "",
        response: "",
        new: true,
        inputs: {
            "start": {},
            "location": { 
                "state": {
                    title: "State",
                    placeholder: "",
                    type: "select",
                    size: 100,
                    value: ''
                },
                "landlord_name": {
                    title: "Landlord Name/Company",
                    placeholder: "Landlord Name or Company, LLC",
                    type: "shorttext",
                    size: 100,
                    value: ''
                },
                "landlord_address": {
                    title: "Landlord Address",
                    placeholder: "i.e. 123 S Main St Town, State 55555",
                    type: "shorttext",
                    size: 100,
                },
                
            },
            "participants": {
                "tenant_name": {
                    title: "Tenant Name",
                    placeholder: "i.e. John Smith",
                    type: "shorttext",
                    size: 100,
                    value: ''
                },
                "property_address": {
                    title: "Property Address",
                    placeholder: "i.e. 456 N Main St Town, State 55555",
                    type: "shorttext",
                    size: 100,
                    value: ''
                }
            },
            "timeframe": {
                "start": {
                    title: "Start date",
                    placeholder: "Start date",
                    type: "date",
                    size: 100,
                    value: ''
                },
                "end": {
                    title: "End date",
                    placeholder: "End date",
                    type: "date",
                    size: 100,
                    value: ''
                },
                "lease_term": {
                    title: "Lease Term",
                    placeholder: "i.e. 1 year, 6 months",
                    type: "shorttext",
                    size: 100,
                    value: ''
                },
                
            },
            "payment": {
                "rent_due_date": {
                    title: "Rent Due Date",
                    placeholder: "i.e. First of the month",
                    type: "shorttext",
                    size: 100,
                    value: ''
                },
                "payment_methods": {
                    title: "Payment methods",
                    placeholder: "i.e. Cash, check, Venmo, etc.",
                    type: "shorttext",
                    size: 100,
                    value: '',
                },
                "rent_amount": {
                    title: "Rent amount ($)",
                    placeholder: "",
                    type: "number",
                    size: 100,
                    step: 25,
                    value: 0
                },
                "security_deposit": {
                    title: "Deposit ($)",
                    placeholder: "",
                    type: "number",
                    size: 100,
                    step: 25,
                    value: 0
                },
            },
            "pets": {
                "pets_allowed": {
                    title: "Pets allowed?",
                    placeholder: "",
                    type: "checkbox",
                    size: 100,
                    value: false
                },
                "pet_deposit": {
                    title: "Pet deposit ($)",
                    placeholder: "$500",
                    type: "number",
                    size: 100,
                    step: 25,
                    value: 0
                },
                "pet_rent": {
                    title: "Pet rent ($)",
                    placeholder: "$50",
                    type: "number",
                    size: 100,
                    step: 25,
                    value: 0
                },
            },
            "late_fees": {
                "late_fee_start": {
                    title: "Late fee start",
                    placeholder: "i.e. 5th of the month",
                    type: "shorttext",
                    size: 100,
                    value: ''
                },
                "late_fee_amount": {
                    title: "Late fee amount ($)",
                    placeholder: "$50",
                    type: "number",
                    size: 100,
                    step: 5,
                    value: 0
                },                
                
                "bad_check_penalty": {
                    title: "Bad check penalty ($)",
                    placeholder: "$50",
                    type: "number",
                    size: 100,
                    step: 5,
                    value: 0
                },
                
            },
            "recurring": {
                "late_fee_recurring": {
                    title: "Late fee recurring?",
                    placeholder: "",
                    type: "checkbox",
                    size: 100,
                    value: false
                },
                "late_fee_recurring_amount": {
                    title: "Recurring per day ($)",
                    placeholder: "$10 per day",
                    type: "number",
                    size: 100,
                    step: 5,
                    value: 0
                },
            },
            "utilities": {
                "utilities_landlord": {
                    title: "What utilities are paid by landlord?",
                    placeholder: "i.e. Trash, sewer",
                    type: "shorttext",
                    size: 100,
                    value: ''
                },
                "utilities_tenant": {
                    title: "What utilities are paid by tenant?",
                    placeholder: "i.e. Electric, gas, water, phone, internet",
                    type: "shorttext",
                    size: 100,
                    value: ''
                }
            },
            "maintenance": {
                "maintenance_name": {
                    title: "Maintenance name",
                    placeholder: "i.e. George Smith",
                    type: "shorttext",
                    size: 100,
                    value: ''
                },
                "maintenance_contact": {
                    title: "Maintenance contact",
                    placeholder: "Phone #, email of maintenance",
                    type: "shorttext",
                    size: 100,
                    value: ''
                }
            },
            "responsibilities": {
                "maintenance_landlord": {
                    title: "What maintenance responibilities are expected of the landlord?",
                    placeholder: "i.e. Snow removal, gutter cleaning",
                    type: "shorttext",
                    size: 100,
                    value: ''
                },
                "maintenance_tenant": {
                    title: "What maintenance responibilities are expected of the tenant?",
                    placeholder: "i.e. Landscaping, cleaning, etc.",
                    type: "shorttext",
                    size: 100,
                    value: ''
                }
            },
            "furnishings": {
                "furnishings": {
                    title: "List furnishing provided by landlord",
                    placeholder: "i.e. Fridge, stove, microwave",
                    type: "shorttext",
                    size: 100,
                    value: ''
                }
            },
            "privileges":{
                "storage_privilege": {
                    title: "Storage policy and privileges",
                    placeholder: "Storage policy for tenant(s)",
                    type: "shorttext",
                    size: 100,
                    value: ''
                },
                "parking_privilege": {
                    title: "Parking policy and privileges",
                    placeholder: "Parking policy for tenant(s)",
                    type: "shorttext",
                    size: 100,
                    value: ''
                }
            },
            "guests": {
                "guest_stay_short": {
                    title: "How long can guests stay at a time?",
                    placeholder: "i.e. 7 days",
                    type: "shorttext",
                    size: 100,
                    value: ''
                },
                "guest_stay_long": {
                    title: "How long can guests stay total per year",
                    placeholder: "i.e. 3 weeks",
                    type: "shorttext",
                    size: 100,
                    value: ''
                },
                "max_guests_allowed": {
                    title: "Max guests allowed?",
                    placeholder: "5",
                    type: "number",
                    size: 100,
                    step: 1,
                    value: 0
                },
            },
            "usage": {
                "sublet_allowed": {
                    title: "Tenant sublet allowed?",
                    placeholder: "",
                    type: "checkbox",
                    size: 100,
                    value: false
                },
                "smoking_allowed": {
                    title: "Smoking allowed on property?",
                    placeholder: "",
                    type: "checkbox",
                    size: 100,
                    value: false
                },
                "lead_paint": {
                    title: "Built prior to 1978?",
                    placeholder: "",
                    type: "checkbox",
                    size: 100,
                    value: false
                },
            },
            "termination": {
                "tenant_termination_notice": {
                    title: "Notice for termination",
                    placeholder: "i.e. 45 days",
                    type: "shorttext",
                    size: 100,
                    value: ''
                },
                "tenant_termination_fee": {
                    title: "Fee for termination",
                    placeholder: "i.e. 4 months rent",
                    type: "shorttext",
                    size: 100,
                    value: ''
                }
            },
            "property_damage": {
                "unexpected_property_damage": {
                    title: "Who pays unexpected property damage?",
                    placeholder: "i.e. Landlord",
                    type: "shorttext",
                    size: 100,
                    value: ''
                },
                "unexpected_property_damage_amount_landlord": {
                    title: "Amount landlord will pay",
                    placeholder: "i.e. 50% up to $1,000",
                    type: "shorttext",
                    size: 100,
                    value: ''
                }
            },
            "keys": {
                "num_keys": {
                    title: "Number of keys",
                    placeholder: "5",
                    type: "number",
                    size: 100,
                    step: 1,
                    value: 0
                },
                "key_replacement_amount": {
                    title: "New key fee ($)",
                    placeholder: "$150",
                    type: "number",
                    size: 100,
                    step: 10,
                    value: 0
                },
                "lockout_amount": {
                    title: "Lockout fee ($)",
                    placeholder: "$300",
                    type: "number",
                    size: 100,
                    step: 10,
                    value: 0
                }
            },
            "provisions": {
                "special_provisions": {
                    title: "Special Provisions",
                    placeholder: "Enter any other provisions you would like to include in the lease agreement, i.e. dispute resolution",
                    type: "textarea",
                    subtext: "",
                    size: 100,
                    value: ''
                },
                "other_provisions": {
                    title: "Other Provisions",
                    placeholder: "Enter any other provisions you would like to include in the lease agreement",
                    type: "textarea",
                    subtext: "",
                    size: 100,
                    value: ''
                },
            }
        }
    },
    {
        id: 3,
        shortName: "contracts",
        shortDescription: "Provide some details about the situation to create a binding service agreement. Please note it is important to consult with a licensed attorney to ensure the agreement protects your interests.",
        name: "Contracts",
        title: 'Write a Contract Agreement',
        submitMessage: "Create",
        step: 0,
        loading: false,
        currentPrompt: "",
        response: "",
        new: false,
        inputs: {
            "start": {},
            "recipient": {
                "state": {
                    title: "State",
                    placeholder: "",
                    type: "select",
                    size: 100,
                    value: ''
                },
                "recipient_name": {
                    title: "Recipient Name",
                    placeholder: "Jim Doe",
                    type: "shorttext",
                    size: 100,
                    value: ''
                },
                "recipient_title": {
                    title: "Recipient Title",
                    placeholder: "Property Owner",
                    type: "shorttext",
                    size: 100,
                    value: ''
                },
            },
            "service_provider": {
                "provider_name": {
                    title: "Provider Name",
                    placeholder: "Jane Smith",
                    type: "shorttext",
                    size: 100,
                    value: ''
                },
                "provider_title": {
                    title: "Provider Title",
                    placeholder: "Property Manager",
                    type: "shorttext",
                    size: 100,
                    value: ''
                },
            },
            "service": {
                "service": {
                    title: "Service to be provided",
                    placeholder: "Explain in detail the service to be provided",
                    type: "textarea",
                    subtext: "",
                    size: 100,
                    value: ''
                },
            },
            "timeframe": {
                "start": {
                    title: "Start date",
                    placeholder: "Start date",
                    type: "date",
                    size: 100,
                    value: ''
                },
                "end": {
                    title: "End date",
                    placeholder: "End date",
                    type: "date",
                    size: 100,
                    value: ''
                },
                "termination": {
                    title: "Termination",
                    placeholder: "What will end this agreement?",
                    type: "shorttext",
                    size: 100,
                    value: ''
                },
            },
            "payment": {
                "payment_method": {
                    title: "Payment method",
                    placeholder: "i.e. Cash, check, money order, Venmo",
                    type: "shorttext",
                    size: 100,
                    value: ''
                },
                "payment_amount": {
                    title: "Payment amount",
                    placeholder: "i.e. $1,000",
                    type: "shorttext",
                    size: 100,
                    value: ''
                },
                "payment_freq": {
                    title: "Payment freq",
                    placeholder: "i.e. Monthly, Quarterly",
                    type: "shorttext",
                    size: 100,
                    value: ''
                },
            },
            "questions": {
                "contractor_insurance": {
                    title: "Contractor obtains insurance?",
                    placeholder: "",
                    type: "checkbox",
                    size: 100,
                    value: false
                },
                "contractor_liable": {
                    title: "Contractor liable for claims?",
                    placeholder: "",
                    type: "checkbox",
                    size: 100,
                    value: false,
                    info: "Is the service provider liable for claims against the recipient?"
                },
                "contractor_return_property": {
                    title: "Contractor must return property?",
                    placeholder: "",
                    type: "checkbox",
                    size: 100,
                    value: false
                },
            },
            "provisions": {
                "deadlines": {
                    title: "Important deadlines",
                    placeholder: "Enter any important deadlines you would like to include in this agreement",
                    type: "textarea",
                    subtext: "",
                    size: 100,
                    value: ''
                },
                "special_provisions": {
                    title: "Special Provisions",
                    placeholder: "Enter any special provisions you would like to include in this agreement",
                    type: "textarea",
                    subtext: "",
                    size: 100,
                    value: ''
                },
                "other_provisions": {
                    title: "Other Provisions",
                    placeholder: "Enter any other provisions you would like to include in this agreement",
                    type: "textarea",
                    subtext: "",
                    size: 100,
                    value: ''
                },
            }
        }
    },
    {
        id: 4,
        shortName: "advice",
        shortDescription: "Provide some details about the information you need to receive helpful advice. Please note this should not be used as a substitute for advice from a licensed attorney.",
        name: "Advice",
        title: 'Ask a Legal Assistant',
        submitMessage: "Submit",
        step: 0,
        loading: false,
        currentPrompt: "",
        response: "",
        new: false,
        inputs: {
            "advice": {
                "question": {
                    title: "Question",
                    placeholder: "Include any relevant background information, specific questions, and/or any relevant laws or regulations that may be applicable.",
                    type: "textarea",
                    subtext: "Ask anything that comes to mind, I bet I can help",
                    size: 100,
                    value: ''
                }
            }
        }
    }
];

export default tabs