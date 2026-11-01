function formValidators<TSchema>(schema: TSchema) {
  return {
    onChange: schema,
    onSubmit: schema,
  };
}

export { formValidators };
