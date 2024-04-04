import { View, Text } from "react-native";
import React from "react";
import InputComponent from "./InputComponent";
import { TypeInputs } from "../types";
import InputWarning from "./InputWarning";

export default function Inputs(props: TypeInputs) {
  return (
    <View>
      <InputComponent
        title="Название"
        value={props.title}
        setValue={props.setTitle}
        setTitleWarning={props.setTitleWarning}
        setLinkWarning={props.setLinkWarning}
      />
      <InputWarning warning={props.titleWarning} />
      <InputComponent
        title="Ссылка"
        value={props.link}
        setValue={props.setLink}
        setTitleWarning={props.setTitleWarning}
        setLinkWarning={props.setLinkWarning}
      />
      <InputWarning warning={props.linkWarning} />
      <InputComponent
        title="Описание"
        value={props.description}
        setValue={props.setDescription}
        setTitleWarning={props.setTitleWarning}
        setLinkWarning={props.setLinkWarning}
      />
    </View>
  );
}
