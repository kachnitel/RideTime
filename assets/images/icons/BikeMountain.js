import React from "react";
import Svg, { G, Path } from "react-native-svg";

const SvgBikeMountain = props => (
  <Svg width="1em" height="1em" viewBox="0 0 15630 12000" {...props}>
    <G fill="#85c131">
      <Path d="M7252 11970c-18-50-93-113-175-148-41-17-156-54-255-81-256-71-323-99-446-187-137-97-240-145-521-238-266-89-373-138-505-231-152-108-193-126-475-205-220-62-298-95-444-189-140-91-306-171-431-210-52-16-156-48-230-71-166-52-252-95-398-199-225-159-430-204-690-151-56 11-127 31-157 45-69 30-162 101-200 152-39 52-598 616-711 717-49 44-128 123-174 174-138 154-662 654-724 691-103 62-173 84-261 85-73 0-87-3-150-36-85-44-151-64-239-73l-66-7v-259c0-241 1-259 18-259 24 0 118-35 150-56 48-31 115-99 172-174 90-118 146-176 239-247 119-92 144-116 214-208 81-106 148-177 227-238 95-74 155-133 220-217 72-93 150-168 257-249 45-34 108-93 140-133 92-115 180-204 285-290 60-48 128-117 177-177 91-113 130-148 205-184 83-41 127-48 336-54 229-6 330 6 515 62 158 47 275 105 413 203 135 96 200 125 454 197 221 64 309 103 538 240 209 124 230 134 463 199 282 80 336 105 508 232 108 80 168 107 394 179 269 85 369 127 491 205 210 135 378 156 475 59 95-95 117-207 129-674 12-436 16-503 38-579 33-120 165-218 400-297 170-57 242-57 546-6 397 68 558 114 788 229 244 120 321 143 730 214 385 66 459 88 824 240 240 100 374 137 704 194 384 66 520 105 719 204 231 116 367 157 751 226 374 68 494 103 835 247 211 89 377 137 640 182 346 60 415 74 518 107 184 59 530 225 677 324 74 50 193 177 225 239 48 95 35 128-101 273-87 94-144 181-144 222 0 14-27 16-217 15h-218l-25-52c-49-100-166-141-601-212-342-57-429-80-644-175-285-126-400-159-890-260-349-71-497-118-724-225-219-103-299-124-721-194-347-57-378-66-700-201-288-121-484-179-775-230-395-69-508-102-755-220-205-98-248-115-343-134-175-36-465 2-548 71-65 55-63 38-70 688-7 695-1 648-118 911-22 51-46 123-54 160l-14 69-245 3-246 2-10-30zM11700 8914c-14-2-56-9-95-15-38-6-117-26-175-45-58-18-199-56-315-84-434-105-526-143-712-292-43-34-123-90-178-126-130-84-176-129-297-290-54-74-145-182-202-241-118-121-138-157-235-401-36-92-96-216-146-305-54-95-96-184-115-241-106-332-103-1004 7-1359 13-44 53-132 88-195 70-127 120-248 185-445 23-71 65-175 93-229 44-87 67-117 180-235 72-75 166-186 210-248 103-147 152-190 274-243 342-146 441-228 511-424 70-193 78-361 27-606-54-261-120-325-287-276-60 17-131 65-270 183-98 83-151 147-228 278-96 163-132 215-208 298-111 122-203 245-258 343-55 99-120 174-205 240-62 48-122 125-184 239-57 104-103 169-200 280-125 143-198 242-267 358-90 151-113 183-204 279-106 112-158 181-235 309-49 81-93 135-198 244-75 78-150 166-167 195-17 30-51 91-75 134-51 93-106 155-245 281-202 182-396 249-604 210-151-28-332-53-500-69-91-9-224-24-296-32-123-15-137-15-208 0-112 25-205 76-284 155-215 214-355 388-442 552-64 121-127 192-286 325-61 51-138 125-172 166-133 162-172 185-487 288-104 34-271 92-370 130-380 143-524 179-766 187-176 6-320-6-512-43-161-31-276-72-397-139-121-68-138-74-311-124-393-114-413-124-560-280-63-67-174-174-247-238-73-65-150-140-171-168-21-27-72-117-115-198-82-159-103-192-208-332-83-109-160-256-187-356-28-101-58-336-78-607-17-241-14-345 23-707 49-481 96-627 287-895 45-64 111-170 146-235 119-223 136-242 381-425 69-52 170-135 225-185 157-143 222-181 480-280 83-32 218-92 300-135 213-109 384-150 728-172 219-15 305-6 582 56 276 62 399 78 484 60 137-29 238-140 373-409 39-77 89-166 110-199 76-111 98-222 64-322-17-50-40-83-158-221-250-292-307-379-329-497-32-178 40-259 377-423 146-72 186-76 375-39 74 14 206 35 294 46 333 43 382 52 502 91 242 79 314 137 411 336 22 43 53 115 71 160 60 152 119 217 224 248 154 46 1230 125 2237 165 151 6 379 18 505 25 398 25 546 18 716-34 97-30 153-72 185-137 25-52 26-59 15-108-15-69-48-115-121-171-102-78-190-111-371-139-122-18-195-46-288-112-42-29-125-84-186-123-139-88-188-130-214-184-61-126 17-314 195-471 110-96 145-141 168-213l18-53h284c242 0 284 2 284 15 0 15 60 59 128 94 23 12 116 39 205 61 258 62 445 94 761 130 141 16 190 25 244 48 144 60 293 185 343 288 30 61 32 69 26 142-4 42-14 102-22 132-19 67-22 317-4 477 14 133 38 235 133 562 106 369 156 641 186 1021 14 181 27 241 64 302 48 79 102 110 253 147 70 16 211 42 313 56 365 50 492 83 701 182 101 48 425 236 540 314 77 52 187 174 267 294 90 136 171 242 254 333 119 132 158 199 248 432 29 74 87 209 130 300 87 182 118 278 152 468 20 110 23 161 23 382 0 227-2 267-23 365-29 142-72 282-129 420-55 135-182 475-213 570-50 155-105 233-231 325-45 34-90 81-134 140-75 101-167 190-257 251-140 93-236 171-297 239-35 39-87 87-115 105-61 41-227 97-471 160-99 26-234 64-301 86-174 56-279 70-559 74-132 2-251 2-265-1zm680-951c36-11 108-38 160-60s147-59 211-82c176-64 222-95 391-267 218-222 253-273 331-500 20-56 65-176 102-267 36-91 84-225 107-299 39-125 42-140 41-253 0-105-5-138-36-258-20-76-65-211-101-300s-88-225-117-302c-124-337-178-403-489-600-69-43-186-120-260-170-156-107-177-118-245-134-124-28-261 60-295 189-25 94 14 545 85 975 45 277 65 442 65 540 0 164-87 268-295 352-91 37-182 44-255 18-104-37-265-164-315-249-35-59-52-112-90-278-42-177-78-387-105-608-47-386-102-535-216-591-42-20-51-21-102-10-78 17-227 91-286 143-102 89-196 237-275 437-22 54-82 182-134 282-111 219-136 309-144 510-9 215 27 346 181 653 56 111 113 233 129 272 47 121 122 217 283 362 49 44 121 115 160 158 41 45 93 91 120 106 30 16 145 51 289 87 132 34 305 79 385 101 228 64 272 70 475 66 142-3 194-8 245-23zm-9278-748c105-9 241-47 425-120 92-37 249-96 348-131 99-36 203-75 231-89 68-33 156-115 262-243 49-59 123-138 165-175 86-77 123-138 112-187-8-36-51-81-99-104-81-38-402-105-656-136-193-24-493-70-609-95-213-45-379-124-497-237-95-91-143-171-151-252-11-107 71-298 222-522 91-133 115-176 174-313 46-107 87-169 192-291 44-52 94-121 111-154 63-123 86-300 52-399-30-89-124-158-238-175-65-10-326 0-461 19-215 29-308 62-410 144-66 55-128 94-259 166-137 74-187 126-266 274-83 158-114 205-200 300-150 168-200 340-230 784-7 105-7 197 0 295 31 409 89 592 245 766 42 47 111 137 153 200 176 268 215 301 502 420 69 28 195 85 280 125 85 41 196 86 245 100 88 26 216 44 265 39 14-2 55-6 92-9zm1502-2099c123-60 167-219 116-416-28-111-50-158-89-197-59-60-139-54-290 18-144 70-279 223-297 337-8 53 18 130 58 171 57 59 114 80 308 115 55 10 142-3 194-28zm1375-175c42-42 35-161-16-268-73-156-184-107-171 76 11 148 120 259 187 192zm1361-106c153-52 246-94 297-133 64-49 73-60 139-182 75-139 95-167 209-290 65-71 144-176 244-325 95-141 179-252 232-310 115-123 167-198 236-345 33-69 83-160 111-203 64-98 71-131 42-191-68-142-214-177-855-206-326-15-948-39-1293-50-312-10-376-6-432 27-58 33-111 156-112 257-1 90 29 162 109 262 146 184 180 246 258 474 76 220 105 281 223 462 129 199 162 265 216 439 76 246 108 307 178 343 40 20 70 16 198-29zM5456 3765c8-31-8-80-27-80-18 0-24 57-9 85 14 27 28 25 36-5z" />
    </G>
  </Svg>
);

export default SvgBikeMountain;