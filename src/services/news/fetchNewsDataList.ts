import axios from "axios";

interface NewsDataProps {
  page?: string;
  size?: number;
  timePeriod?: "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY";
  category?: "BASEBALL" | "FOOTBALL" | "ESPORTS" | "";
  orderType?: "DATE" | "COMMENT" | "VIEW";
  content?: string;
  withPageInfo?: boolean;
}

const fetchNewsDataList = async ({
  page = "1",
  size = 5,
  withPageInfo = false,
  timePeriod = "WEEKLY",
  category = "",
  orderType = "DATE",
  content,
}: NewsDataProps = {}) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}api/news`,
    {
      params: {
        category,
        orderType,
        page,
        size,
        timePeriod,
        content,
      },
    }
  );

  const list = response.data?.data?.list;
  console.log(list, "전체데이터");
  if (withPageInfo) {
    return {
      content: list?.content ?? [],
      pageInfo: list?.pageInfo ?? null,
    };
  }

  return list?.content ?? [];
};

export default fetchNewsDataList;

// import axios from "axios";

// interface NewsDataProps {
//   page?: string;
//   size?: number;
//   timePeriod?: "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY";
//   category?: "BASEBALL" | "FOOTBALL" | "ESPORTS" | "";
//   orderType?: "DATE" | "COMMENT" | "VIEW";
//   content?: string;
//   withPageInfo?: boolean;
// }

// const fetchNewsDataList = async ({
//   page = "1",
//   size = 5,
//   withPageInfo = false,
//   timePeriod = "WEEKLY",
//   category = "",
//   orderType = "DATE",
//   content,
// }: NewsDataProps = {}) => {
//   const response = await axios.get(
//     `${process.env.NEXT_PUBLIC_API_URL}api/news`,
//     {
//       params: {
//         category,
//         orderType,
//         page,
//         size,
//         timePeriod,
//         content,
//       },
//     }
//   );

//   const list = response.data?.data?.list;
//   console.log(list, "전체데이터");
//   if (withPageInfo) {
//     return {
//       content: list?.content ?? [],
//       pageInfo: list?.pageInfo ?? null,
//     };
//   }

//   return list?.content ?? [];
// };

// export default fetchNewsDataList;
