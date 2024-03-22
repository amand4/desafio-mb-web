export const schemas = {
  email: [
    {
      condition: (value) => {
        const pattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/
        return !pattern.test(value)
      },
      message: 'E-mail inválido'
    },
    {
      condition: (value) => !value,
      message: 'Campo email é obrigatório'
    },
  ],
  type: [
    {
      condition: (value) => !value,
      message: 'Por favor, escolha um tipo de cadastro'
    }
  ],
  password: [
    {
      condition: (value) => !value,
      message: 'Campo senha é obrigatório'
    }
  ],
  pf: {
    name: [
      {
        condition: (value) => !value,
        message: 'Campo nome é obrigatório'
      },
      {
        condition: (value) => value && value?.length < 2,
        message: 'O campo nome deve ter no mínimo 2 caracteres'
      }
    ],
    cpf: [
      {
        condition: (value) => !value,
        message: 'Campo cpf é obrigatório'
      },
    ],
    dateBirth: [
      {
        condition: (value) => !value,
        message: 'Campo data é obrigatório'
      },
    ],
    phone: [
      {
        condition: (value) => !value,
        message: 'Campo telefone é obrigatório'
      },
    ]
  },

  pj: {
    socialReason: [
      {
        condition: (value) => !value,
        message: 'Campo razão social é obrigatório'
      },
    ],
    cnpj: [
      {
        condition: (value) => !value,
        message: 'Campo cnpj é obrigatório'
      },
    ],
    openDate: [
      {
        condition: (value) => !value,
        message: 'Campo data de abertura é obrigatório'
      },
    ],
    phone: [
      {
        condition: (value) => !value,
        message: 'Campo telefone é obrigatório'
      },
    ]
  }
}

/**
 * Function to validate a form based on form data, validation rules, and person type.
 * @param {object} localFormData - The form data.
 * @param {object} errors - The object where validation errors will be stored.
 * @param {string} registrationType - The type of person ('physical person(pf)' or 'legal person(pj)') to determine which validation rules to apply.
 * @returns {boolean} - Returns true if the form is valid, false otherwise.
 */
export const validateForm = (localFormData, errors, registrationType) => {
  errors.value = {}

  for (const fieldName in localFormData.value) {
    const fieldValue = localFormData.value[fieldName]

    if (schemas[fieldName]) {
      schemas[fieldName].forEach(validationRule => {
        if (validationRule.condition(fieldValue)) {
          errors.value[fieldName] = validationRule.message
        }
      })
    } else if (schemas[registrationType] && schemas[registrationType][fieldName]) {
      
      schemas[registrationType][fieldName].forEach(validationRule => {
        if (validationRule.condition(fieldValue)) {
          errors.value[fieldName] = validationRule.message
        }
      })
    }
  }

  const formIsValid = Object.values(errors.value).every(error => !error)
  return formIsValid
}


