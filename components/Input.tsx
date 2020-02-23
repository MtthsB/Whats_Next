import React, { useEffect, useState } from 'react'

type Props = {
  handleInput(input: string): void;
  placeholder: string;
}

const Input = (props: Props) => {
  const [input, updateInput] = useState<string>('')

  useEffect(() => {
    updateInput('')
  }, [props.handleInput])

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      input && props.handleInput(input)
    }
  }

  const onButtonPress = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    props.handleInput(input)
  }

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => updateInput(e.target.value)

  return (
    <section className="input">
      <input
        className='input__field'
        onChange={onInputChange}
        onKeyPress={handleKeyPress}
        placeholder={props.placeholder}
        type="text"
        value={input} />
      <button
        className='input__btn'
        onClick={onButtonPress}
        type="submit">Search</button>
    </section>
  )
}

export default Input
