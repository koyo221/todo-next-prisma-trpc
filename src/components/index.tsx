/** @jsxImportSource @emotion/react */
import React, { memo } from "react";
import type { NextPage } from "next";
import { Todo } from "@prisma/client";
import { css } from "@emotion/react";

interface ListItemProps {
  item: Todo;
  onUpdate?: (item: Todo) => void;
}

const ListItemComponent: NextPage<ListItemProps> = ({ item, onUpdate }) => {
  return (
    <div css={listWrapper}>
      <input
        css={listCheckbox}
        type="checkbox"
        defaultChecked={item.checked}
        onChange={() => onUpdate?.(item)}
      />
      <h2 css={listTitle}>{item.title}</h2>
    </div>
  );
};

export const ListItem = memo(ListItemComponent);

const listWrapper = css({
  display: "flex",
  alignItems: "center",
});

const listCheckbox = css({
  marginRight: 12,
});

const listTitle = css({
  textOverflow: "ellipsis",
  overflow: "hidden",
});

interface CardFormProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  submit: () => void;
}

export const CardForm: NextPage<CardFormProps> = ({
  value,
  onChange,
  submit,
}) => {
  return (
    <div css={cardWrapper}>
      <input
        type="text"
        placeholder="feed dogs"
        onChange={onChange}
        value={value}
      />
      <button css={cardButton} type="button" onClick={submit}>
        Add
      </button>
    </div>
  );
};

const cardWrapper = css({
  height: 30,
  marginBottom: 10,
});

const cardButton = css({
  marginLeft: 4,
});
