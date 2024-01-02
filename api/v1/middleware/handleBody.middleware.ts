import { NextFunction, Request, Response } from "express";
// import { transformCode, transformValue } from '../helpers/helpers';

// export const transformCodeAndValue = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   req.body.value;
//   req.body.code;
//   console.log(req.body);
// };

// export const formatBodyForMultiLesson = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   req.body.list_lesson = req.body.list_lesson.map(
//     (lesson: { code: string; value: string }) => {
//       lesson.value = transformValue(lesson.value);
//       lesson.code = transformCode(lesson.code);
//       return lesson;
//     }
//   );
//   next();
// };
