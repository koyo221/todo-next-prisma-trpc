/** @jsxImportSource @emotion/react */
import { CardForm, ListItem } from "@/components";
import { Todo } from "@prisma/client";
import { trpc } from "@/utils/trpc";
import { useCallback, useState } from "react";
import Head from "next/head";
import type { NextPage } from "next";
import { css } from "@emotion/react";

const Home: NextPage = () => {
  const [itemName, setItemName] = useState<string>("");

  const { data: list = [], refetch } = trpc.findAll.useQuery();
  const insertOneMutation = trpc.insertOne.useMutation({
    onSuccess: () => refetch(),
  });
  const deleteAllMutation = trpc.deleteAll.useMutation({
    onSuccess: () => refetch(),
  });
  const updateOneMutation = trpc.updateOne.useMutation({
    onSuccess: () => refetch(),
  });

  const insertOne = useCallback(() => {
    if (itemName === "") return;
    insertOneMutation.mutate({ title: itemName });
    setItemName("");
  }, [itemName, insertOneMutation]);

  const clearAll = useCallback(() => {
    if (list?.length) {
      deleteAllMutation.mutate({
        ids: list.map((item) => item.id),
      });
    }
  }, [list, deleteAllMutation]);

  const updateOne = useCallback(
    (item: Todo) => {
      updateOneMutation.mutate({
        ...item,
        checked: !item.checked,
      });
    },
    [updateOneMutation]
  );

  return (
    <>
      <Head>
        <title>Todo List</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main css={wrapper}>
        <div css={innerPadding}>
          <header>
            <h1>Todo</h1>
            <div css={headerSubContent}>
              <p css={count}>
                {list?.length} {list?.length > 1 ? "tasks" : "task"} left.
              </p>
              <button css={clear} onClick={clearAll}>
                Clear all tasks
              </button>
            </div>
          </header>
          <div css={listWrapper}>
            {list?.map((item: any) => (
              <ListItem key={item.id} item={item} onUpdate={updateOne} />
            ))}
          </div>
          <CardForm
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            submit={insertOne}
          />
        </div>
      </main>
    </>
  );
};

const wrapper = css({
  width: "50vw",
  height: "80vh",
  margin: "10vh auto",
  border: "1px black solid",
});

const innerPadding = css({
  paddingLeft: 16,
  height: "80vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
});

const headerSubContent = css({
  display: "flex",
  alignItems: "center",
});

const count = css({
  margin: "0 20px 0 4px",
});

const clear = css({
  height: 20,
});

const listWrapper = css({
  flex: 1,
  overflow: "scroll",
});

export default Home;
